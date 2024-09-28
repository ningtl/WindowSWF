

function fangdai(num){
    var doc = an.getDocumentDOM();
    if (doc==null){
        alert("兄弟你的动画文档都打开 怎么搞？")
        return 1;
    }

    if (num === 0){
        alert("兄弟，你没有选择元件啊， 我要对什么操作呢？")
        return  1;
    }
}