# 扩展支持  
当前支持微服务框架有dubbo、openfeign、grpc，开发者如果使用其他的框架并且同时也遇到分布式事务场景，可以参考以下内容。

## 扩展流程
支持新的RPC框架只需解决事件上下文传递问题即可。
这里以我们[openfeign](/zh-cn/docs/tutorial/rpc/openfeign.html)的支持为例进行说明。
### 调用方如何发送事件上下文
**定义拦截器FeignInterceptor**，实现openfeign调用的拦截。 代码如下：  
```java
public class FeignInterceptor implements RequestInterceptor {

    private TransactionContextSerializer transactionContextSerializer = new TransactionContextSerializer();

    @Override
    public void apply(RequestTemplate requestTemplate) {
        Annotation annotation = requestTemplate.methodMetadata().method().getAnnotation(EnableTcc.class);

        if (annotation != null && TransactionContextHolder.getCurrentTransactionContext() != null) {
            requestTemplate.header(TransactionContextConstants.TRANSACTION_CONTEXT,
                    Base64.getEncoder().encodeToString(transactionContextSerializer.serialize(TransactionContextHolder.getCurrentTransactionContext())));
        }

        return;
    }
}
```

**被拦截的FeignClient**，以下代码来源于[tcc-transaction-http-sample](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-tutorial-sample/tcc-transaction-http-sample)
```java
@FeignClient(name = "capital", url = "http://localhost:8082/tcc-transaction-http-capital/")
public interface CapitalFeignClient {

    @EnableTcc
    @RequestMapping(value = "/tradeOrder/record", method = RequestMethod.POST)
    @ResponseBody
    String record(@RequestBody CapitalTradeOrderDto tradeOrderDto);
}

```

**注意事项**
- tcc接口上必现添加@EnableTcc  
> 1、ConfigurableCoordinatorAspect识别@EnableTcc，执行添加事件参与方，并保存分支事件上下文到TransactionContextHolder中  
>  
> 2、feign拦截器内部识别此注解才传递事件上下文，避免无效传递。  
   
- 事件上下文为了实现隐式传递，一般放到header(http)或attachment(dubbo)里，不同框架不一样。   
- 事件上下文序列化后再传递。    

### 服务如何接收事件上下文
**web服务端拦截**，实现如下：
```java
public class RequesterInterceptor implements HandlerInterceptor {

    private TransactionContextSerializer transactionContextSerializer = new TransactionContextSerializer();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String transactionContext = request.getHeader(TransactionContextConstants.TRANSACTION_CONTEXT);
        if (StringUtils.isNotEmpty(transactionContext)) {
            TransactionContextHolder.setCurrentTransactionContext(transactionContextSerializer.deserialize(Base64.getDecoder().decode(transactionContext)));
        }

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        String transactionContext = request.getHeader(TransactionContextConstants.TRANSACTION_CONTEXT);
        if (StringUtils.isNotEmpty(transactionContext)) {
            TransactionContextHolder.clear();
        }
    }
}
```

**注意事项**
- 从header中取出事件上下文，并进行反序列化
- 取出的事件上下文，放到TransactionContextHolder中，请求结束时从TransactionContextHolder清理事件上下文。  
