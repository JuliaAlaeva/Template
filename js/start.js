// all buttons
var all_buttons = doc.getElementsByClassName("button_carousel");

// change slides
function change_slide(event) 
{
    
    // click-button
    var button_choose = event.target;
    
    // slide choosed
    if(button_choose.classList.contains("choose_slide"))
    {
        return;
    }
    
    // it's id
    var button_choose_id = button_choose.id;
    
    // all slides
    var all_slides = doc.getElementsByClassName("slide");
    
    // change shoosed slide z-index
    for(var i = 0, k = all_slides.length; i < k; i++) 
    {
        // it's id
        var id_elem = all_slides[i].id;
        var reg = new RegExp(button_choose_id);
        //check id
        if(id_elem.search(reg) != "-1")
        {
            doc.getElementById(id_elem).style.zIndex = "1";
        }
        else
        {
            doc.getElementById(id_elem).style.zIndex = "0";
        }
    }
    
    // delete class
    for(var i = 0, k = all_buttons.length; i < k; i++) 
    {
        all_buttons[i].classList.remove("choose_slide");
    }
    // add choosed slide class
    button_choose.classList.add("choose_slide");
    
    if(button_choose_id == "3")
    {
        doc.getElementById("3").style.background = "#50c1e9";
    }
    else
    {
        doc.getElementById("3").style.background = "#c8c8c8";
    }
    
}

// change foto on the second slide
function change_block_photo()
{

    // block with image
    var block_img = doc.getElementById("block_animation");

    // image's mass
    var mass_img = [
        'img/start_page/menu_choose/slide2_photo_1.2.png',
        'img/start_page/menu_choose/slide2_photo_1.3.png',
        'img/start_page/menu_choose/slide2_photo_1.1.png'
    ];
    
    var i = 0;
    
    // set repeat
    setInterval(change_repeat, 3000);    
    
    // delay
    function change_repeat()
    {
        // second image
        if(i == 0)
        {
            // fot tablet version
            if(doc.documentElement.clientWidth <= 1024 && doc.documentElement.clientWidth > 480)
            {
                block_img.style.backgroundSize = "65% 75%";
            }
            else
            {
                block_img.style.backgroundSize = "80% 75%";
            }
            
        }
        else
        {
            block_img.style.backgroundSize = '';
        } 
        
        // third image
        if(i == 1)
        {
            block_img.style.backgroundPosition = '50% 40px';
        }
        else
        {
            block_img.style.backgroundPosition = '';
        }
    
        // change image
        block_img.style.backgroundImage = 'url("' + mass_img[i] + '")';
        
        i++;
              
        if(i > mass_img.length - 1)
        {
            i = 0;
        }
        
    }
    
}

for(var i = 0, k = all_buttons.length; i < k; i++) 
{
    // change slide on click
    addEvent(all_buttons[i], "click", change_slide);

    if(all_buttons[i].id == "2")
    {
        // change image, only second slide chooded
        addEvent(all_buttons[i], "click", change_block_photo);
    }

}

// change block
function tablet_start()
{
    // check resolution for mobile version
    if(doc.documentElement.clientWidth <= 1024 && doc.documentElement.clientWidth > 480 )
    {
        // block don't exist yet
        if(doc.getElementById("moved_block") == undefined)
        {
            // find block and new position
            var shift_banner_block = doc.getElementById("move_block");
            var change_block = doc.getElementById("change_banner");

            // copy and insert in new position
            var new_block = shift_banner_block.cloneNode(true);
            change_block.parentNode.appendChild(new_block);
            
            // change id
            change_block.parentNode.getElementsByClassName("block4_slide2")[0].id = "moved_block";
        }
    }
    // check resolution for another version
    else if(doc.documentElement.clientWidth <= 480 || doc.documentElement.clientWidth > 1024 )
    {
        // cancel changes
        
        // needless block
        new_block = doc.getElementById("moved_block");
        
        // exist block
        if(new_block != undefined)
        {
            // delete
            new_block.parentNode.removeChild(new_block);
        }

    }
}

// add events for load page and resize window
addEvent(doc, "DOMContentLoaded", tablet_start);
addEvent(window, "resize", tablet_start);