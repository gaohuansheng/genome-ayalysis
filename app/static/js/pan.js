/**
 * Created by hsgao on 11/29/16.
 */

//绘图
//定义宽高
var width = parseInt($(".svg").css("width"));
var height = parseInt($(".svg").css("height"));

//定义画布
var svg = d3.select(".svg")
    .append("svg")
    .attr("width",width)
    .attr("height",height)
    .attr("cursor","auto");

//使用g实现任意拖动和缩放
var g = svg.append("g");

//辅助变量
var isMouseDown,curPos_x,curPos_y;

//存储当前缩放比例
var scale;

//定义一个列表，存储links中的属性，用于生成筛选条件
var edge_list=[];


//力布局
var simulation = d3.forceSimulation()
        .force("charge",d3.forceManyBody().strength(-50))
        .force("link",d3.forceLink().id(function (d) {
            return d.id
        }))
        .force("x",d3.forceX(width/2))
        .force("y",d3.forceY(height/2));
simulation.force("charge")
    .distanceMax(500);


//导入文件
d3.json("static/data/final_appjs_info.json",function (error,root) {
    //在控制台查看数据，方便调试
    console.log(root);
    if(error){
        throw error;
    }

    //绑定数据
    simulation.nodes(root.nodes);
    simulation.force("link").links(root.links);

    console.log(root.nodes);
    console.log(root.links);

    //定义缩放变量
    var zoom = d3.zoom()
        .scaleExtent([0.1, 8])
        .on("zoom",zoomed)
        .filter(filtered);
    //绘制连线
    var svg_links = g.selectAll(".link")
        .data(root.links)
        .enter()
        .append("line")
        .attr("class","link")
        .attr("stroke-width",function (d) {
            return d.value;
        })
        .on("mouseover",edgeMouseOver)
        .on("mouseout",edgeMouseOut)
        .on("click",edgeClick);

    //绘制节点
    var colors = d3.scaleOrdinal(d3.schemeCategory20);
    var svg_nodes = g.selectAll(".node")
        .data(root.nodes)
        .enter()
        .append("circle")
        .attr("class","node")
        .attr("r", function (d) {
            return Math.sqrt(d.weight)*3;
        })
        .attr("fill",function (d,i) {
            return colors(i);
        })
        .on("dblclick",nodeFixed)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    //添加文字
    var svg_texts = g.selectAll(".text")
        .data(root.nodes)
        .enter()
        .append("text")
        .attr("class","text")
        .attr("dx",0)
        .attr("dy",6)
        .text(function (d) {
            return d.id;
        })
        .attr("opacity",1);

    //动态计算坐标，动起来
    simulation.on("tick",function () {
        svg_links.attr("x1",function (d) {
            return d.source.x;
        })
            .attr("y1",function (d) {
                return d.source.y;
            })
            .attr("x2",function (d) {
                return d.target.x;
            })
            .attr("y2",function (d) {
                return d.target.y;
            });
        svg_nodes.attr("cx",function (d) {
                return d.x;
        })
            .attr("cy",function (d) {
                return d.y;
            });
        svg_texts.attr("x",function (d) {
            return d.x;
        })
            .attr("y",function (d) {
                return d.y;
            })

    });
    $(".text").hide();

    //整体缩放拖拽事件
    function zoomed() {
            g.attr("transform", d3.event.transform);
            scale = d3.event.transform.k
    }
    //当整体选中时zoom失效
    function filtered() {
       if (svg.attr("cursor") === "auto"){
           return true;
       }
       if (svg.attr("cursor") === "move"){
           return false;
       }
    }
    svg.call(zoom)
        .on("dblclick.zoom",null);

    //节点拖动事件
    function dragstarted(d) {
            svg.attr("cursor","move");
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x, d.fy = d.y;
    }
    function dragged(d) {
            d.fx = d3.event.x, d.fy = d3.event.y;
            svg.attr("cursor","move")
    }
    function dragended(d) {
        svg.attr("cursor","auto");
        if (!d3.event.active) simulation.alphaTarget(0);
        if(d.fixed === true){
            d.fx = d.x;
            d.fy = d.y;
        }
        else{
            d.fx = null, d.fy = null;
        }
    }


    //鼠标悬浮线条高亮显示事件,点击选中等
    function edgeMouseOver(){
        if(!$(this).hasClass("hidden")){
            if (!$(this).hasClass("selected")){
                $(this).removeClass("link")
                    .addClass("highlighted")
            }
        }
    }
    function edgeMouseOut() {
        if (!$(this).hasClass("hidden")){
            if(!$(this).hasClass("selected")){
                $(this).removeClass("highlighted")
                    .addClass("link")
            }
        }
    }
    function edgeClick() {
        if(!$(this).hasClass("hidden")){
            if($(this).hasClass("highlighted")){
                $(this).removeClass("link")
                    .removeClass("highlighted")
                    .addClass("selected")
            }
            else{
                $(this).removeClass("highlighted")
                    .removeClass("selected")
                    .addClass("link")
            }
        }
    }


    //节点双击固定事件
    function nodeFixed(d) {
        if(d.fixed === undefined || d.fixed === false){
            d.fixed = true;
            d.fx = d.x;
            d.fy = d.y;
        }
        else{
            d.fixed = false;
            d.fx = null;
            d.fy = null;
        }
    }




    //Statistic


    //Filter
    $("#toggleNodes").on("click",function(){
        $("circle").toggleClass("hidden");
    });

    $("#toggleEdges").on("click",function () {
        $("line").toggleClass("hidden");
    });

    $("#toggleTexts").on("click",function () {
        $("g>text").toggleClass("hidden");
    });

    //reset功能实现
    $("#reset").on("click",resetted);

    function resetted() {
        svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    }

    //filter
    $("#weightControl").change(function () {
        weight = $("#weightControl").val();
        svg_nodes.attr("class",function (d) {
            if (d.weight<weight){
                return "hide"
            }
            else
                return "show"
        });
        svg_links.attr("class", function (d) {
            if (d.source.weight<weight || d.target.weight<weight){
                return "hide link"
            }
            else
                return "show link"
        })
        svg_texts.attr("class",function (d) {
            if (d.weight<weight){
                return "hide text"
            }
            else
                return "show text"
        });
    });




    //工具栏功能实现
    //实现整体选择节点
    $(document).on("click",function(){
        if ($("#OverallSelection").is(":focus")){
            svg.attr("cursor","crosshair");
        }
        else{
            svg.attr("cursor","auto");
        }
    });

    svg.on("mousedown",function (event) {
        window.event.preventDefault();
        if (svg.attr("cursor") === "crosshair"){
            isMouseDown = true;
            curPos_x = d3.mouse(this)[0];
            curPos_y = d3.mouse(this)[1];
            var coverDiv = document.createElement("div");
            $(coverDiv).addClass("coverDiv");
            $(coverDiv).css("left",curPos_x);
            $(coverDiv).css("top",curPos_y+51);
            $("body").append(coverDiv);
        }
    });
    svg.on("mousemove",function (e) {
        if (isMouseDown && svg.attr("cursor") === "crosshair"){
            var max_x = Math.max(curPos_x,d3.mouse(this)[0]);
            var min_x = Math.min(curPos_x,d3.mouse(this)[0]);
            var max_y = Math.max(curPos_y,d3.mouse(this)[1]);
            var min_y = Math.min(curPos_y,d3.mouse(this)[1]);
            $(".coverDiv").css("left",min_x)
                .css("top",min_y+51)
                .css("width",max_x-min_x)
                .css("height",max_y-min_y);
            $("circle").each(function () {
                var offset = $(this).offset();
                if (offset.left<max_x && offset.left>min_x && offset.top-51>min_y && offset.top-51<max_y){
                    $(this).attr("fill","#fff")
                }
                else{
                    d3.select(this).attr("fill",function (d,i) {
                        return colors(i);
                    })
                }
            });
        }
    });
    $(document).on("mouseup",function (e) {
            isMouseDown = false;
            $(".coverDiv").remove();
    });


    //点击显示信息事件
    $(document).on("click",function(){
        if ($("#getDetails").is(":focus")){
            svg.attr("cursor","pointer");
        }
    });
    svg_nodes.on("mouseenter",getDetails);
    function getDetails() {
         if ($("#getDetails").is(":focus")){
             var Message = $(".message");
             Message.show();
            $($(".message li")[0]).text("id : " + d3.select(this)._groups[0][0].__data__.id);
            $($(".message li")[1]).text("weight : "+d3.select(this)._groups[0][0].__data__.weight);
            $($(".message li")[2]).text("group : "+d3.select(this)._groups[0][0].__data__.group);
        }
    }

    $(".message button").on("click",function(){
        $(".message").hide();
    })

});




































