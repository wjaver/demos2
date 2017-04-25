//$接受一个字符串或元素或元素列表，返回一个数组，这个数组有on addClass removeClass...API
window.$ = function(selectorOrNode){
    let array = []
    if(typeof selectorOrNode === 'string'){
        let items = document.querySelectorAll(selectorOrNode)  //items是一个对象，不是数组。数组可以push
        for(var i=0; i<items.length; i++){
            array.push(items[i])}  //将items的属性值添加到数组array中。数组有on属性，但是不能遍历
    }else if(selectorOrNode instanceof Element){  //document.body既是Node又是Element，但是他的子节点有可能不是Element
        array.push(selectorOrNode)
    }else if(selectorOrNode instanceof Array){  //对数组进行封装，封装多个element
        for(var i=0; i<selectorOrNode.length; i++){
            array.push(selectorOrNode[i])}
    }    

    array.on = function(eventType,fn){  //给array添加一个方法on，on接收两个参数：事件类型，回调
        for(var i=0; i < array.length;i++){
            array[i].addEventListener(eventType,fn)  //遍历array里面的所有元素，添加回调
            //addEventListener作用：向指定元素添加事件句柄
        }
    }

    array.addClass = function(className){
        for(var i=0; i<array.length;i++){
            array[i].classList.add(className)  //classList属性返回元素的类名，该属性用于在元素中添加，移除及切换CSS类，该属性是只读的，但可以用add（），remove（）修改它
        }
        return array  //如果不写这一行，执行items.addClass('hi').removeClass('error')就会报错：无法读取未定义的removeClass属性
    }

    array.removeClass = function(className){
        for(var i=0; i<array.length;i++){
            array[i].classList.remove(className)  
        }
        return array
    }

    array.text = function(value){  //设置并获取一个值
        if(value !== undefined){  //如果有传参数
          for(var i=0; i<array.length;i++){
            array[i].textContent = value  //非标准innerText ，IE支持
          }
          return array
        }else{
            let result = []
            for(var i=0; i<array.length;i++){
              result.push(array[i].textContent)
            }
            return result
        }
    }

    array.get = function(index){
        return array[index]
    }

    array.end = function(){
        return array.previousSelection   //让end属性等于previousSelection属性
    }

    array.siblings = function(){  //获取兄弟，不包括自己
        let children = array[0].parentNode.children
        let resultArray = []
        for(var i=0;i<children.length;i++){
            if(children[i] !== array[0]){
                resultArray.push(children[i])
            }
        }
        let items = $(resultArray)
        items.previousSelection = array
        return items
    }
    return array
}