const nzd=require('node-zookeeper-dubbo');
const app=require('express')();
const opt={
    application:{name:'rpc-consumers'},
    register:'10.211.55.8:2181', // zookeeper url
    dubboVer:'2.6.0',
    root:'dubbo',
    dependencies:{
        GoodsAPI:{
            interface:'com.bacchus.rio2.api.goods.IGoodsAPI',
            version:'1.0.0',
            timeout:6000,
            group:'rio2',
            methodSignature: {
                // findCityByName : (name) => [ {'$class': 'java.lang.String', '$': id} ],
                getGoodsByGroupId : (groupId) => (java) => [ java.String(groupId) ],
                synGoodsToCache : () => (java) => [],
                getLatestOrder : (openId) => (java) => [ java.String(openId) ],
                getGoodsMaterial : (productId,sourceType) => (java) => [ java.String(groupId),java.String(sourceType) ],


            }
        },
        IDIYAPI:{
            interface:'com.bacchus.rio2.api.goods.IDIYAPI',
            version:'1.0.0',
            timeout:6000,
            group:'rio2',
            methodSignature: {
                getDiyProductList : (memberId) => (java) => [ java.String(memberId) ],
                getRawMaterial : () => (java) => [],
                createOrUpdateDiyProduct : (openId) => (java) => [ java.String(openId) ],


            }
        }

    }
}
opt.java = require('js-to-java');
const Dubbo=new nzd(opt);


app.get('/goodsApi/getGoodsByGroupId',(req,res)=>{
    Dubbo.GoodsAPI.getGoodsByGroupId('')
        .then(data=>res.send(data))
        .catch(err=>res.send(err))
})

var server = app.listen(9090, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

