// clean bag
function empty_bag(event)
{
    // clear localStorage
    localStorage.clear();
    
    // show message
    var wrapper_items = doc.getElementById("wrapper_items");
    wrapper_items.innerHTML = "<span class='message'>Your shopping bag is empty. Use <a href='catalog.html'>Catalog</a> to add new items.</span>";
    
    bag();
    all_price();
}

// remove item
function remove_item(event)
{
    // buttons
    var all_button_remove = doc.getElementsByClassName("remove_item");
    
    // get data
    var cartData = getCartData('cart');

    // search click-element
    var current_item = event.currentTarget;
    var parent_item = current_item.parentNode.parentNode;
    var count = parent_item.getElementsByClassName("count")[0];
    var id_item = parent_item.id;
    var number = parent_item.getAttribute("data-number");
    var good = cartData[id_item][number];
    
    if(good[4] == 1)
    {
        
        // remove
        parent_item.parentNode.removeChild(parent_item);
        
        delete cartData[id_item][number];
        
        if(Object.keys(cartData[id_item]).length == 0)
        {
            delete cartData[id_item];
        }
        
    }
    else
    {
        // uptade count
        good[4]--;
    }
    
    setCartData(cartData);
    
    if(Object.keys(cartData).length == 0)
    {
        empty_bag();
    }
    
    show_items();
    bag();
}

// total price
function all_price()
{   
    // get in the header
    var fill_bag = doc.getElementById("fill_bag").innerHTML;
    
    // get only price
    var reg = /[\d-\.]{1,}/;
    var value_price = fill_bag.match(reg);
    
    // insert the value
    var total = doc.getElementById("total");
    total.innerHTML = value_price;
    
    if(!value_price)
    {
        total.innerHTML = "0";
    }
    
}

// show items
function show_items()
{
    // get parent
    var wrapper_items = doc.getElementById("wrapper_items");
    
    // get data
    var cartData = getCartData('cart');
    
    // aren't goods
    if(!cartData)
    {
        return false;
    }
    
    // clear block
    wrapper_items.innerHTML = "";
    
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
            
            var content = "<div class='preview'><img src='img/catalog_page/" + key1 + ".png' alt='clothes'/><div class='price_item'>&pound;<span class='price'>" + price_item + "</span></div></div><section class='description'><h4>" + name_item + "</h4><div class='details'><ul><li>Color: " + color_item + "</li><li>Size: " + size_item + "</li><li>Quantity: <span  class='count'>" + count_item + "</span></li></ul></div><button class='remove_item'>Remove item</button></section>";
            
            parent.innerHTML = content;
            
            // add to page
            wrapper_items.appendChild(parent);
        }
    }
    
    // buttons
    var all_button_remove = doc.getElementsByClassName("remove_item");

    // add events
    for(var i = 0, k = all_button_remove.length; i < k; i++)
    {
        addEvent(all_button_remove[i], "click", remove_item);
        addEvent(all_button_remove[i], "click", all_price);
    }
}

// function buy
function buy_now(event)
{
    // clear localStorage
    localStorage.clear();
    
    // show message
    var wrapper_items = doc.getElementById("wrapper_items");
    var message = doc.getElementById("message");
    
    if(doc.getElementsByClassName("item").length < 1)
    {
        wrapper_items.innerHTML = "<span class='message'>Your shopping bag is empty. Use <a href='catalog.html'>Catalog</a> to add new items.</span>";
    }
    else
    {
        wrapper_items.innerHTML = "<span class='message'>Thank you for your purchase!</span>";
    }
    
    bag();
    all_price();
}

var buy_now_button = doc.getElementById("buy_now");
var empty_bag_button = doc.getElementById("empty_bag");
addEvent(empty_bag_button, "click", empty_bag);
addEvent(empty_bag_button, "click", all_price);
addEvent(buy_now_button, "click", buy_now);
addEvent(buy_now_button, "click", all_price);
addEvent(doc, "DOMContentLoaded", show_items);
addEvent(doc, "DOMContentLoaded", all_price);