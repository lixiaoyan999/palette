window.addEventListener('load',function(){
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let palette = new Palette(canvas);
    let shape= document.querySelectorAll('.two > li');
    shape.forEach(ele =>{
        let type = ele.id;
    ele.onclick = function(){
        shape.forEach(obj=>{
            obj.classList.remove('hot');
    });
       ele.classList.add('hot');
        if(type == 'poly' || type == 'polyj'){
            let ang = prompt('请输入变数或角数');
            palette[type](ang);
        }else{
            palette[type]();
        }
    }
});

});






