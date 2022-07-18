# 术语

## domain
domain要保证唯一性，一般与服务一一对应，主要用于对事件隔离。   
**注意事项：**  
- 要保证唯一性  
- 不能与现有domain具有包含关系，比如TCC:TRADE,TCC:TRADE-ORDER(此问题待修复)  

