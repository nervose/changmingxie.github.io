# API支持

## 核心类
### TransactionManagerInterceptor

对**PlatformTransactionManager**的getTransaction、commit、rollback方法进行拦截，提供基于乐观锁的并发控制、聚合根维度的事务保证和事件发布等能力。   
注：对于未显示使用@Transactional注解的方法，相关逻辑在执行**AbstractAggregateRepository**的save方法时触发。  

### AnnotationEventListenerBeanPostProcessor
应用启动时，通过该类将方法上含有@EventHandler注解的bean封装成**EventListener**，注册到**SimpleEventBus**作为事件的订阅者。

### AbstractSimpleAggregateRoot
聚合根对象所需继承的父类，说明：  
1.可通过实现CompositeId接口创建复合主键(适用于分库分表的场景)。  
2.可利用@DaoAwareQuery注解实现聚合根与领域对象之间的关联关系。  
3.可通过apply方法来发布事件。  

### AbstractSimpleDomainObject
领域对象所需继承的父类。

### AggregateRootDao、CollectiveAggregateRootDao
聚合根的DAO所需实现的接口，在CollectiveAggregateRootDao额外定义了批量操作的方法。

### DomainObjectDao、CollectiveDomainObjectDao
领域对象的DAO所需实现的接口，在CollectiveDomainObjectDao额外定义了批量操作的方法。

### DaoAwareAggregateRepository
聚合根的Repository所需继承的父类，实现了对聚合根及其附属领域对象的增、删、改、查操作。

使用示例:
```java
//该示例中，将Account类作为聚合根，SubAccount类作为领域对象，一个Account下可能存在多个SubAccount
//Account.class 
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Account extends AbstractSimpleAggregateRoot<Long> {

    private Long id;

    private String accountId;

    private Integer eventStatus;

    @DaoAwareQuery(mappedBy = "account", select = "findByParentId")
    private List<SubAccount> subAccounts = new ArrayList<>();

    public void applyAccountCreateEvent(){
        apply(new AccountCreateEvent(accountId));
    }
}

//SubAccount.class
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubAccount extends AbstractSimpleDomainObject<Long> {

    private Long id;

    private String accountId;

    private Account account;

    private Integer eventStatus;
}

//AccountDao.class
public interface AccountDao extends AggregateRootDao<Account,Long> {

    Account findByAccountId(@Param("accountId")String accountId);

    List<Account> findByAccountIds(List<String> accountIds);
}

//SubAccountDao.class
public interface SubAccountDao extends DomainObjectDao<SubAccount,Long> {

    List<SubAccount> findByParentId(@Param("parentId") Long parentId);
}

//AccountRepository.class
@Repository
public class AccountRepository extends DaoAwareAggregateRepository<Account,Long> {

    @Autowired
    private AccountDao accountDao;

    public AccountRepository() {
        super(Account.class);
    }

    public Account findByAccountId(String accountId) {
        return fetchAllComponents(accountDao.findByAccountId(accountId));
    }

    public List<Account> findByAccountIds(List<String> accountIds) {
        return fetchAllComponents(accountDao.findByAccountIds(accountIds));
    }
}
```
AccountMapper.xml  
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="AccountDao" >
    
    <resultMap id="baseResultMap" type="Account">
        <result property="id" column="ID"/>
        <result property="accountId" column="ACCOUNT_ID"/>
        <result property="eventStatus" column="EVENT_STATUS"/>
        <result property="createTime" column="CREATE_TIME"/>
        <result property="lastUpdateTime" column="LAST_UPDATE_TIME"/>
        <result property="version" column="VERSION"/>
    </resultMap>

    <sql id="sql_select">
        SELECT ID,
               ACCOUNT_ID,
               EVENT_STATUS,
               VERSION,
               CREATE_TIME,
               LAST_UPDATE_TIME
        FROM ACCOUNT
    </sql>

    <select id="findAll" resultMap="baseResultMap">
        <include refid="sql_select"/>
    </select>

    <select id="findById" resultMap="baseResultMap">
        <include refid="sql_select"/>
		WHERE ID=#{id}
    </select>

    <select id="findByAccountId" resultMap="baseResultMap">
        <include refid="sql_select"/>
        WHERE ACCOUNT_ID=#{accountId}
    </select>

    <select id="findByAccountIds" resultMap="baseResultMap">
        <include refid="sql_select"/>
        WHERE ACCOUNT_ID in 
        <foreach item="item" index="index" collection="list" separator="," open="(" close=")">
            #{item}
        </foreach>
    </select>

    <insert id="insert" useGeneratedKeys="true" keyProperty="id" keyColumn="ID" parameterType="Account">
        INSERT INTO ACCOUNT
            (ACCOUNT_ID,EVENT_STATUS,VERSION,CREATE_TIME,LAST_UPDATE_TIME)
        VALUES
            (#{accountId},#{eventStatus},#{version},#{createTime},#{lastUpdateTime})
    </insert>

    <update id="update" parameterType="Account">
        UPDATE
        `ACCOUNT`
        SET
        ACCOUNT_ID=#{accountId},
        EVENT_STATUS=#{eventStatus},
        VERSION=#{version},
        LAST_UPDATE_TIME=#{lastUpdateTime}
        WHERE ID=#{id}
        AND VERSION=#{version}-1
    </update>

    <delete id="delete">
        DELETE FROM ACCOUNT WHERE ID=#{id}
    </delete>
</mapper>
```
SubAccountMapper.xml  
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="SubAccountDao" >
    <resultMap id="baseResultMap" type="SubAccount">
        <result property="id" column="ID"/>
        <result property="accountId" column="ACCOUNT_ID"/>
        <result property="account.id" column="PARENT_ID"/>
        <result property="eventStatus" column="EVENT_STATUS"/>
        <result property="createTime" column="CREATE_TIME"/>
        <result property="lastUpdateTime" column="LAST_UPDATE_TIME"/>
    </resultMap>

    <sql id="sql_select">
        SELECT ID,
               ACCOUNT_ID,
               PARENT_ID,
               EVENT_STATUS,
               CREATE_TIME,
               LAST_UPDATE_TIME
        FROM SUB_ACCOUNT
    </sql>

    <select id="findById" resultMap="baseResultMap">
        <include refid="sql_select"/>
        WHERE ID=#{id}
    </select>

    <select id="findByParentId" resultMap="baseResultMap">
        <include refid="sql_select"/>
        WHERE PARENT_ID = #{parentId}
    </select>

    <insert id="insert" useGeneratedKeys="true" keyProperty="id" keyColumn="ID" parameterType="SubAccount">
        INSERT INTO SUB_ACCOUNT
            (ACCOUNT_ID,PARENT_ID,EVENT_STATUS,CREATE_TIME,LAST_UPDATE_TIME)
        VALUES
        (#{accountId},#{account.id},#{eventStatus},#{createTime},#{lastUpdateTime})
    </insert>

    <update id="update" parameterType="SubAccount">
        UPDATE
            `SUB_ACCOUNT`
        SET
            ACCOUNT_ID=#{accountId},
            PARENT_ID=#{account.id},
            EVENT_STATUS=#{eventStatus},
            LAST_UPDATE_TIME=#{lastUpdateTime}
        WHERE ID=#{id}
    </update>


    <delete id="delete">
        DELETE FROM
            SUB_ACCOUNT WHERE ID=#{id}
    </delete>
</mapper>
```

## 核心注解

### @EventHandler
此注解作用于方法上，表明使用该方法作为事件处理器，[详见](/zh-cn/aggdocs/tutorial/eventhandler.html)。方法的入参有且仅有一个，是所需处理的事件类型（也可以是集合）。**特别注意**：1.可以为一个事件绑定多个事件处理器，彼此相互独立。2.事件处理器所在的类需要被注册到spring容器中。  
**属性说明：**
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|默认值|
|:------|:------|:------|:-----------|:-----------------|
| asynchronous | 是否异步执行 | boolean | false |
| asyncConfig | 异步执行时的配置 | [AsyncConfig](#%40asyncconfig) | |
| postAfterTransaction | 是否在事务提交后执行 | boolean | false |
| isTransactionMessage | 是否保证事务性(最终一致) | boolean | false |
| transactionCheck | 需要保证事务的情况下，校验该处理器是否需要执行的方法名，入参为事件类型，返回boolean值 |TransactionCheck|  | |
| order| 异步confirm |boolean | Integer.MIN_VALUE(最先执行) |

### @AsyncConfig
AGG内部集成了[Disruptor](https://lmax-exchange.github.io/disruptor/)框架，用于提升异步事件的处理性能，此注解用于设置其相关配置。  
**属性说明：**
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|默认值|
|:------|:------|:------|:-----------|:-----------------|
| queueFullPolicy | 环形队列打满时的处理策略 | 枚举，可取值：DISCARD直接丢弃、ENQUEUE等待入队、SYNCHRONOUS使用当前线程执行 | SYNCHRONOUS |
| ringBufferSize | 环形缓冲队列大小 | int | 4096 |
| workPoolSize | 工作线程数(事件处理器入参为非集合时使用) | int | 24 |
| maxBatchSize | 批处理大小上限(事件处理器入参为集合时使用) | int | 1024 |