$(function(){
	
	
	        var canvas = $('canvas')[0];
        var context = canvas.getContext('2d');

        function Dot() {
            this.alive = true; //
            this.x = Math.round(Math.random() * canvas.width);//随机x坐标
            this.y = Math.round(Math.random() * canvas.height);//随机y坐标
            this.diameter = Math.random() * 7;  //随机圆的半径
            this.colorIndex = Math.round(Math.random() * 3);//颜色随机抽取的下标
            this.colorArray = ['rgba(255,153,0,', 'rgba(66,66,66,', 'rgba(188,188,188,', 'rgba(50,153,187,'];//储存颜色
            this.alpha = 0.1;//圆点的透明度
            //设置随机颜色
            this.color = this.colorArray[this.colorIndex] + this.alpha + ')';
            //随机的速度
            this.velocity = { x: Math.round(Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7, y: Math.round(Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7 };
        }

        //console.log(Dot)

        Dot.prototype = {

            //圆点属性
            Drawww: function () {
                context.fillStyle = this.color;//圆点的颜色
                context.beginPath();//开始
                context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false); //画圆弧长 Math.PI是半圆  Math.PI*2是整个圆  0.5为四分之一
                    // false为顺时针，true为逆时针（决定了圆弧的方向）
                context.fill();//结束
            },

            Dteaaa: function () {
                if (this.alpha < 0.8) {//如果透明度小于0.8//颜色渐变
                    //console.log(this.color);
                    this.alpha += 0.01;
                    this.color = this.colorArray[this.colorIndex] + this.alpha + ')';
                    //console.log('===' + this.color);
                }

                //圆点移动
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                //移动到画布外停止运动
                if (this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
                    this.alive = false;
                }
            }
        };





        var EntityArray = [];

        function Initialize() {
            //画布长宽为可视窗口
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            //生产100个对象
            for (var x = 0; x < 100; x++) {
                EntityArray.push(new Dot());
            }

            Update();//运动函数
            
        }

        function Update() {

            if (EntityArray.length < 100) {
                //小于100个则增加对象
                for (var x = EntityArray.length; x < 100; x++) {
                    EntityArray.push(new Dot());
                }
            }

            //遍历没个对象设置动画，给每个对象添加动画的方法
            EntityArray.forEach(function (dot) {
                dot.Dteaaa();
            });

        
            //filter() 方法返回符合一定条件的元素。该方法让您规定一个条件。
            //不符合条件的元素将从选择中移除，符合条件的元素将被返回。
            //该方法通常用于缩小在被选元素组合中搜索元素的范围。

            //带判断的遍历的,留下数组里turn的对象
            EntityArray = EntityArray.filter(function (dot) {
                return dot.alive;
            });

            //给剩下的对象添加动画样式
            Draw();     

            //表意为“请求动画帧”，
            //1、requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
            //2、在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。
            
            //递归调用
            requestAnimationFrame(Update);
                         
     
        }

/*            var s = 0;
            function as() {
                s++
                requestAnimationFrame(as);
                console.log(s)
            }
            as()
*/

    
        function Draw() {
            //清除画布
            context.clearRect(0, 0, canvas.width, canvas.height);

            //遍历对象添加样式画圆
            EntityArray.forEach(function (dot) {
                dot.Drawww();
            });

        }

        //画布随窗口变化
        $(window).resize(function () {
            EntityArray = [];//改变屏幕圆点位置不变
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        Initialize(); //
	
	
	
	
	
	
	
	
	
})
