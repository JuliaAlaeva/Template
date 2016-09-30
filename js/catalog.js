// coords of elements
function getCoords(elem) 
{
    var box = elem.getBoundingClientRect();

    return {
        // position element
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

// control slider
function range() 
{
    // move mouse
    function move_thumb(e) {

        // find thum of move
        var elem = e.currentTarget;
        // coords
        var thumb1Coords = getCoords(thumbElem1);
        var thumb2Coords = getCoords(thumbElem2);
        var sliderCoords = getCoords(sliderElem);

        if(elem.classList.contains("first"))
        {
            var shiftX = e.pageX - thumb1Coords.left;

            // move mouse 
            doc.onmousemove = function(e) {

                var newLeft = e.pageX - shiftX - sliderCoords.left;

                // thumb out slider left
                if (newLeft < 0) {
                    newLeft = 0;
                }

                var right_point = thumb2Coords.left - sliderCoords.left - thumbElem2.offsetWidth;

                // more second
                if (newLeft > right_point) {
                    newLeft = right_point;
                }

                thumbElem1.style.left = newLeft + 'px';

                doc.getElementById("s1").innerHTML = Math.round(newLeft * 5.813953488372093);
            }

            doc.onmouseup = function() {
                doc.onmousemove = doc.onmouseup = null;
            };

        }
        else if(elem.classList.contains("second"))
        {
            var shiftX = e.pageX - thumb2Coords.left;

            document.onmousemove = function(e) {

                var newLeft = e.pageX - shiftX - sliderCoords.left;

                var left_point = thumb1Coords.left - sliderCoords.left + thumbElem1.offsetWidth;

                if (newLeft < left_point) {
                    newLeft = left_point;
                }

                var rightEdge = sliderElem.offsetWidth - thumbElem2.offsetWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                thumbElem2.style.left = newLeft + 'px';

                doc.getElementById("s2").innerHTML = Math.round(newLeft * 5.813953488372093);
            }

            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
            };

        }
        doc.onmouseup = function() 
        {
            doc.onmousemove = document.onmouseup = null;
        };

        // disable selection start (cursor change)
        return false; 
    };
    
    function drag_thumb() 
    {
        return false;
    }
    
    var sliderElem = doc.getElementById('slider');
    var thumbElem1 = sliderElem.getElementsByClassName("thumb")[0];
    var thumbElem2 = sliderElem.getElementsByClassName("thumb")[1];

    // down on thumb
    addEvent(thumbElem1, "mousedown", move_thumb);
    addEvent(thumbElem2, "mousedown", move_thumb);
    addEvent(thumbElem1, "dragstart", drag_thumb);
    addEvent(thumbElem2, "dragstart", drag_thumb);
    
    function getCoords(elem) 
    {
        var box = elem.getBoundingClientRect();

        return {
            // position element
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }
    
}

// add range's action
var range_field = doc.getElementById("range_field");
addEvent(range_field, "mouseover", range);

// dinamic change of parameters
function choose_parameter(event)
{
    // give active menu
    var menu = event.currentTarget;
    
    // menu's fields
    var inputs = menu.getElementsByTagName("input");
    
    for(var i = 0, k = inputs.length; i < k; i++)
    {
        // search choosed radio
        if(inputs[i].checked)
        {
            // contents
            var name = inputs[i].parentNode.querySelector("label").innerHTML;

            // field of parameter's name
            var field_choose_name = menu.parentNode.getElementsByClassName("name_parameter")[0];
            
            // field of choosed parameter
            var field_choose = menu.parentNode.getElementsByClassName("choose_parameter")[0];
            
            // check "not selected"
            if(name == "Not selected")
            {
                if(field_choose_name.classList.contains("choosed_title"))
                {
                    // delete contents of field, choose class
                    field_choose.innerHTML = "";
                    field_choose_name.classList.remove("choosed_title");
                    menu.parentNode.classList.remove("choosed");
                    
                }   
                return false;
            }

            // change parameter
            field_choose.innerHTML = name;
            
            // add class
            if(!field_choose_name.classList.contains("choosed_title"))
            {
                // change title's style
                field_choose_name.classList.add("choosed_title");
                
                // add class menu
                menu.parentNode.classList.add("choosed");
            }
            
        }
    }
}

// move row
function move_row(e) 
{
    
    // event mouseup
    function clearXY() 
    {
        // cancel event
        document.onmousemove = null;
    }
    
    // find row of move
    var elem = e.currentTarget;
    
    // current croods cursor
    x = e.pageX;
        
    // event mousemove and mouseup
    doc.onmousemove = moveBlock;
    addEvent(doc, "mouseup", clearXY);
    elem.onselectstart = function()
    {
        return false;
    }
    
    // event move
    function moveBlock(e) 
    {
        // initial value
        var max_shift = 0;
 
        // width block
        var children = elem.getElementsByTagName("li");
        for(var i = 0, k = children.length; i < k; i++)
        {
            if(i == children.length-1)
            {
                continue;
            }
            
            var param_block = getComputedStyle(children[i]);
            var width_block = param_block.width;
            
            // add all width
            max_shift = max_shift + parseInt(width_block);
        }
        
        // new croods
        newX = e.pageX;
        var shift = newX - x;
        
        // position 
        var current_param = getComputedStyle(elem);
        var current_margin = parseInt(current_param.marginLeft);
        var new_margin = current_margin + shift;
        
        // right poiner
        if(new_margin > 0)
        {
            elem.style.marginLeft = "40px";
            return false;
        }
        else if(Math.abs(new_margin) > max_shift)
        {
            elem.style.marginLeft = "-" + max_shift + "px";
            return false;
        }

        elem.style.marginLeft = new_margin + "px";
    }
}

// add action for drop menu
var all_drop_menu = doc.getElementsByClassName("drop_down");
for(var i = 0, k = all_drop_menu.length; i < k; i++)
{
    addEvent(all_drop_menu[i], "click", choose_parameter);
}

// menu of filtres
var parameters = doc.getElementById("parameters");

// for tablet and mobile version
function tablet_version() 
{
    // check resolution
    if(doc.documentElement.clientWidth <= 1024)
    {
        for(var i = 0, k = all_drop_menu.length; i < k; i++)
        {
            addEvent(all_drop_menu[i], "mousedown", move_row);
        }
        
        // add event for each radio
        for(var i = 0, k = all_radio.length; k > i; i++)
        {
            addEvent(all_radio[i], "change", fill_line);
            addEvent(all_radio[i], "change", first_parameter);
        }
        
        if(!doc.getElementById("line_parameter"))
        {
            // add new block
            var line_parameter = doc.createElement("div");
            line_parameter.id="line_parameter";
            var parameters_choosed = doc.createElement("div");
            parameters_choosed.id="parameters_choosed";
            // add event
            addEvent(parameters_choosed, "click", show_filtres);
            line_parameter.appendChild(parameters_choosed);
            var parameters = doc.getElementById("parameters");
            parameters.insertBefore(line_parameter, parameters.firstChild);
            // fill parameters
            fill_line();
        }
        
    }
    else if(doc.documentElement.clientWidth > 1024)
    {
        // detete for desktop
        var line = doc.getElementById("line_parameter");
        var note = doc.getElementById("note");
        
        if(line)
        {
            line.parentNode.removeChild(line);
            
            if(note)
            {
                note.parentNode.removeChild(note);
            }
        }
    }
}

// all radio
var all_radio = parameters.getElementsByTagName("input");

// fill line of parameter and dub choosed parameter
function fill_line()
{
    // check resolution
    if(doc.documentElement.clientWidth <= 1024)
    {
        // variable for safe choosed parameters
        var parent = doc.getElementById("parameters_choosed");
        parent.innerHTML = "";
        
        for(var i = 0, k = all_radio.length; k > i; i++)
        {
            // checked
            if(all_radio[i].checked)
            {
                // adding element
                var paremeter = doc.createElement("span");
                // contents
                var value = all_radio[i].parentNode.querySelector("label").innerHTML;

                // choosed "Not selected"
                if(value == "Not selected")
                {
                    // give the field with parameter's name                
                    name = all_radio[i].parentNode.parentNode.parentNode.getElementsByClassName("name_parameter")[0].innerHTML;
                    
                    paremeter.className = "not_selected";
                    
                    // element isn't last menu
                    if(all_radio[i].parentNode.parentNode.parentNode.id != "price_range")
                    {
                        name = name + ", ";
                    }
                    
                    paremeter.innerHTML = name;
                    
                    // update value
                    parent.appendChild(paremeter);
                }
                else
                {   
                    // element isn't last menu
                    if(all_radio[i].parentNode.parentNode.parentNode.id != "price_range")
                    {
                        value = value + ", ";
                    }
                    
                    paremeter.innerHTML = value;
                    
                    // update value
                    parent.appendChild(paremeter);

                } 
            }
        }
        
        if(!parameters.classList.contains("show_all"))
        {
            var arrow = doc.createElement("div");
            arrow.id = "menu_arrow_line";
            
            // update value
            parent.appendChild(arrow);
        }
        
    }
}

// close filtres
function close_filtres()
{
    // remove class menu
    parameters.classList.remove("show_all");
    parameters.style.zIndex = "0";
    
    // remove note
    var note = doc.getElementById("note");
    note.parentNode.removeChild(note);
    
    // remove icon
    var icon_closed = doc.getElementById("icon_closed");
    icon_closed.parentNode.removeChild(icon_closed);
    
    var body = doc.getElementsByTagName("body")[0];
    body.classList.remove("dis");
    
    fill_line();
}

// show filtres
function show_filtres(event)
{
    // menu don't open
    if(!parameters.classList.contains("show_all"))
    {
        // create and add icon 
        var icon_closed = doc.createElement("div");
        icon_closed.id="icon_closed";
        line_parameter.appendChild(icon_closed);
        addEvent(icon_closed, "click", close_filtres);

        // add inscription
        var note = doc.createElement("div");
        note.id = "note";
        note.innerHTML = "Drag and select";
        parameters.insertBefore(note, line_parameter.nextSibling);

        // add class menu
        parameters.className = "show_all";
        parameters.style.zIndex = "5";
        
        // delete arrow
        var menu_arrow_line = doc.getElementById("menu_arrow_line");
        if(menu_arrow_line)
        {
            menu_arrow_line.parentNode.removeChild(menu_arrow_line);
        }
        
        var body = doc.getElementsByTagName("body")[0];
        body.className = "dis";
        
        first_parameter();
        
    }

}

// choosed parameter - first
function first_parameter()
{
    // shift all menu
    for(var j = 0, m = all_drop_menu.length;j < m; j++)
    {
        // menu's fields
        var inputs = all_drop_menu[j].getElementsByTagName("input");
        
        // set initial
        var margin = -35;
        
        // check all input
        for(var i = 0, k = inputs.length; i < k; i++)
        {
            // inf of parent node
            var parent = getComputedStyle(inputs[i].parentNode);
            // width comma
            var comma = all_drop_menu[j].getElementsByClassName("comma")[0];
            var li_comma = getComputedStyle(comma);
            
            // checked
            if(inputs[i].checked)
            {   
                if(i == 0)
                {
                    all_drop_menu[j].style.marginLeft = "35px" ;
                    continue;
                }
                all_drop_menu[j].style.marginLeft = "-" + margin + "px" ;
                continue;
            }
            margin = margin + parseInt(parent.width);
            margin = margin + parseInt(li_comma.width) + 5;
            
        }
    }
}

// show more goods
function show_more()
{
    // get container
    var catalog_goods = doc.getElementById("catalog_goods");
    
    // get last element catalog
    var li_element = catalog_goods.getElementsByTagName("li");
    var index = li_element.length-1;
    var last_element = li_element[index];
    var last_id = last_element.id;
    
    var request = new XMLHttpRequest();
    
    request.open('GET', 'js/goods.json', true);

    request.send();

    request.onreadystatechange = function() 
    {
        if(request.readyState != 4)
        {
            return false;
        }
        if (request.status != 200) 
        {
            return false;
        } 
        else 
        {
            answer = JSON.parse(request.responseText);
            
            for(var key in answer)
            {
                if(key > last_id)
                {
                    // create element and add to page
                    var one_type_item = answer[key];
                    var li = doc.createElement("li");
                    li.id = key;
                    var src = one_type_item[0];
                    var img = one_type_item[1];
                    var name = one_type_item[2];
                    var price = one_type_item[3];
                    var content = "<a href='" + src + "'><img src='" + img + "' alt='shirt'/><section class='wrapper_title_catalog'><h4>" + name + "</h4><span class='price'>&pound; " + price + "</span></section></a>";
                    li.innerHTML = content;
                    catalog_goods.appendChild(li);
                }
            }  
        }
    }
}

// add button event
var button_show_more = doc.getElementById("button_show_more");
addEvent(button_show_more, "click", show_more);

// add events for load page and resize window
addEvent(doc, "DOMContentLoaded", tablet_version);
addEvent(window, "resize", tablet_version);