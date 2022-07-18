# API支持

## 核心类

### TransactionContext


## 核心注解

### @Compensable

此注解用于定义tcc的实现逻辑，即try-confirm-cancel三阶段的实现，**特别注意**：confirm和cancel方法参数要与try保持一致

### @EnableTcc

此注解用于声明tcc接口，用于远程调用时传递事件上下文(TransactionContext)


### @UniqueIdentity
