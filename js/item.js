// all images
var all_photo = doc.getElementsByClassName("photo");

// change big foto
function change_photo(event) 
{
    // current image
    var img = event.target;
    
    // image choosed
    if(img.parentElement.classList.contains("choose_photo"))
    {
        return;
    }
    
    // its src
    var src = img.src;
    
    // big photo
    var main_photo = doc.getElementById("big_img");
    
    // replace
    main_photo.src = src;
    
    // delete class
    for(var i = 0, k = all_photo.length; i < k; i++) 
    {
        all_photo[i].parentElement.classList.remove("choose_photo");
    }
    
    // add class choosed icon 
    img.parentElement.classList.add("choose_photo");
    
}

for(var i = 0, k = all_photo.length; i < k; i++) 
{
    addEvent(all_photo[i], 'click', change_photo);
}

var add_item = doc.getElementById("add_item");

// add to bag
function add_to_bag()
{
    // block button
    this.disabled = true;
    
    // get data or creat
    var cartData = getCartData('cart') || {};
    
    // id item
    var id_item = this.getAttribute('data-id');

    // name of item
    var name_item = doc.getElementById("name").innerHTML;
    
    // price of item
    var price_item = doc.getElementById("price").innerHTML;
    
    // size of item
    var all_size = doc.getElementById("size").getElementsByTagName("input");
    for(var i = 0, k = all_size.length; i < k; i++)
    {
        if(all_size[i].checked)
        {
            var size_item = all_size[i].nextSibling.innerHTML;
        }
    }

    // color of item
    var all_color = doc.getElementById("color").getElementsByTagName("input");
    for(var i = 0, k = all_color.length; i < k; i++)
    {
        if(all_color[i].checked)
        {
            var color_item = all_color[i].nextSibling.innerHTML;
        }
    }
    
    // new object
    var new_obj = [ name_item, price_item, size_item, color_item ];
    
    // good is exist, increace count
    findCoincidence:
    if(cartData.hasOwnProperty(id_item))
    {
        var obj = cartData[id_item];
        
        for(var key in obj)
        {
            var one_item = obj[key];
            
            for(var i = 0, k = one_item.length-1; k > i; i++)
            {
                // not similar
                if(one_item[i] != new_obj[i])
                {
                    continue;
                }
                if(i == k-1)
                {
                    one_item[4] += 1;
                    break findCoincidence;
                }
            }
        }
        
        var number = Object.keys(obj).length;
        // not coincidence - new good
        obj[number] = [ name_item, price_item, size_item, color_item, 1 ];
    } 
    else 
    { 
        // add new good
        cartData[id_item] = {};
        var obj = cartData[id_item];
        obj["0"] = [ name_item, price_item, size_item, color_item, 1 ];
    }
    
    // updata LocalStorage
    if(!setCartData(cartData))
    {
        this.disabled = false;
    }
    
    bag();
}

// event add to bag
addEvent(add_item, "click", add_to_bag);