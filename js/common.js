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
        var all_inf = all_price_value + "(" + all_count + ")";
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

var header = doc.getElementById("main_header");

// drop menu
function show_menu()
{
    // find menu and menu's icon
    var drop_menu = doc.getElementsByClassName("main_nav")[0];
    var icon_menu = doc.getElementById("icon_menu");
    
    // menu isn't show
    if(!drop_menu.classList.contains("show_menu"))
    {
        header.style.position = "relative";
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
        
        var drop_menu = doc.getElementsByClassName("main_nav")[0];
        drop_menu.style.display = "none";

        // change menu's view
        if(doc.getElementById("icon_menu") == undefined)
        {
            // create and add icon
            var icon_menu = doc.createElement("div");
            icon_menu.id = "icon_menu";
            icon_menu.addEventListener("click", show_menu);
            var wrapper_icon = doc.createElement("div");
            wrapper_icon.classList = "wrapper_icon";
            wrapper_icon.appendChild(icon_menu);
            header.appendChild(wrapper_icon);
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
        var wrapper_icon = doc.getElementsByClassName("wrapper_icon");
        
        // icon is exist
        if(wrapper_icon != null)
        {

            // show menu
            doc.getElementsByClassName("main_nav")[0].style.display = "flex";
            // delete bg
            var body = doc.getElementsByTagName("body")[0];
            body.className = "";
        }
        
    }
}

// add events for load page and resize window
addEvent(doc, "DOMContentLoaded", bag);
addEvent(doc, "DOMContentLoaded", mobile_version);
addEvent(window, "resize", mobile_version);