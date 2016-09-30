// cash
var doc = document;

// get data LocalStorage
function getCartData(key)
{
    if(localStorage.getItem(key))
    {
        return JSON.parse(localStorage.getItem(key));
    }
}

// write LocalStorage
function setCartData(data)
{
    localStorage.setItem('cart', JSON.stringify(data));
    return false;
}

// total price
function bag()
{   
    // get data
    var cartData = getCartData('cart');
    
    var all_count = 0;
    var all_price_value = 0;

    for(var key1 in cartData)
    {
        var one_type_item = cartData[key1];

        for(var key2 in one_type_item)
        {
            // get data
            var one_item = one_type_item[key2];
            var price_item = one_item[1];
            var count_item = one_item[4];

            all_count += count_item;
            all_price_value += +price_item*count_item;
        }
    }
    
    var inf_bag = doc.getElementById("inf_bag");
    
    // show in the header
    var fill_bag = doc.getElementById("fill_bag");
    if(all_price_value != "0")
    {
        var all_inf = all_price_value.toFixed(2) + "(" + all_count + ")";
        fill_bag.innerHTML = all_inf;
        inf_bag.style.display = "inline-block";
    }
    else
    {
        // hidden in the header
        fill_bag.innerHTML = all_inf;
        inf_bag.style.display = "none";
    }
}

// crossbrowe's event
function addEvent(elem, type, handler){

    if(elem.addEventListener)
    {
        elem.addEventListener(type, handler, false);
    } 
    else 
    {
        console.log("+");
        elem.attachEvent('on'+type, function(){ handler.call(elem); });
    }
    return false;
}

var menu = doc.getElementById("bottom_header");

// drop menu
function show_menu()
{
    // find menu and menu's icon
    var header = doc.getElementById("main_header");
    var drop_menu = menu.getElementsByClassName("main_nav")[0];
    var icon_menu = doc.getElementById("icon_menu");
    
    // menu isn't show
    if(!drop_menu.classList.contains("show_menu"))
    {
        header.style.position = "absolute";
        header.style.zIndex = "5";
        drop_menu.style.display = "block";
        drop_menu.classList.toggle("show_menu");
        // change icon
        icon_menu.classList.add("show_icon");
        
        var body = doc.getElementsByTagName("body")[0];
        body.className = "dis";
    }
    else
    {
        header.style.position = "relative";
        header.style.zIndex = "3";
        drop_menu.style.display = "none";
        drop_menu.classList.toggle("show_menu");
        icon_menu.classList.remove("show_icon");
        
        var body = doc.getElementsByTagName("body")[0];
        body.className = "";
    }

}

// change in mobile's version
function mobile_version()
{
    // check resolution for the mobile's version
    if(doc.documentElement.clientWidth <= 480)
    {
        // change position of block in the footer
        var shift_block = doc.getElementById("social_network");
        var parent_block = doc.getElementById("legal_inf");
        parent_block.appendChild(shift_block);
        
        var drop_menu = menu.getElementsByClassName("main_nav")[0];
        drop_menu.style.display = "none";

        // change menu's view
        if(doc.getElementById("icon_menu") == undefined)
        {
            // create and add icon
            var icon_menu = doc.createElement("div");
            icon_menu.id = "icon_menu";
            icon_menu.addEventListener("click", show_menu);
            menu.insertBefore(icon_menu, menu.firstChild);
        }
        
    }
    // check resolution for another version
    else if(doc.documentElement.clientWidth > 480 )
    {
        // cancel changes
        
        // block in footer
        var shift_block = doc.getElementById("social_network");
        if(shift_block.parentNode.id != "delivery")
        {
            var parent_block = doc.getElementById("delivery");
            parent_block.appendChild(shift_block);
        }
        
        // delete icon
        var icon_menu = doc.getElementById("icon_menu");
        
        // delete bg
        var body = doc.getElementsByTagName("body")[0];
        body.className = "";
        // show menu
        doc.getElementById("main_header").style.position = "relative";
        
        // icon is exist
        if(icon_menu != null)
        {
            // delete icon
            icon_menu.parentNode.removeChild(icon_menu);
            // show menu
            menu.getElementsByClassName("main_nav")[0].style.display = "flex"
        }
        
    }
}

var hover_bag = doc.getElementsByClassName("bag")[0];
addEvent(hover_bag, "mouseover", preview);
addEvent(hover_bag, "mouseout", preview);

function preview()
{
    var exist = doc.getElementById("hover_inf");
    
    if(exist != undefined)
    {
        exist.parentElement.removeChild(exist);
        return false;
    }
    
    var container = doc.createElement("ul");
    container.id = "hover_inf";
    
    // get data
    var cartData = getCartData('cart');

    // aren't goods
    if(!cartData)
    {
        return false;
    }

    for(var key1 in cartData)
    {
        var one_type_item = cartData[key1];

        for(var key2 in one_type_item)
        {
            // get data
            var one_item = one_type_item[key2];
            var name_item = one_item[0];
            var price_item = one_item[1];
            var size_item = one_item[2];
            var color_item = one_item[3];
            var count_item = one_item[4];

            // create element
            var parent = doc.createElement("li");
            parent.id = key1;
            parent.setAttribute("data-number", key2);
            parent.className = "item";

            var content = "<div class='preview'><img src='img/catalog_page/" + key1 + ".png' alt='clothes'/><div class='price_item'>&pound;<span class='price'>" + price_item + "</span></div><br/></div><section class='description'><h4>" + name_item + "</h4><div class='details'><ul><li>Color: " + color_item + "</li><br/><li>Size: " + size_item + "</li><li>Quantity: <span  class='count'>" + count_item + "</span></li></ul></div>";

            parent.innerHTML = content;
            container.appendChild(parent)

            // add to page
            hover_bag.appendChild(container);
        }
    }
}

// add events for load page and resize window
addEvent(doc, "DOMContentLoaded", bag);
addEvent(doc, "orientationchange", mobile_version);
addEvent(doc, "DOMContentLoaded", mobile_version);
addEvent(window, "resize", mobile_version);