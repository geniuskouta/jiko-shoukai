var DropItem = function() {
    //�A�j���T�C�Y
    var anime_height =32;
    var anime_width = 32;
    //�\���ʒu�i��΃A�h���X�j
    var vertical_pos = 0;
    var horizontal_center_pos = 0;
    var horizontal_pos = 0;
    //�ړ����x(px)
    var speed = 0;
    //�h���
    var swing_width = 0;
    var swing_degree = 90;
    //�ʐ^�z��
    var pict = ["url(images/pnd.png)", "url(images/8bitheart.png)", "url(images/doggo.gif)", "url(images/drop.png)"];
    var select = 0;

    //�Đݒ�
    this.reset = function(w_height, w_width, w_margin) {
    
        //�J�n�ʒu�i��΃A�h���X�j
        vertical_pos = w_margin;
        horizontal_center_pos= Math.floor(Math.random()*(w_width-anime_width-w_margin*2))+w_margin;
        horizontal_pos = horizontal_center_pos;
        //�ړ����x(px):[1-10]
        speed = Math.floor(Math.random()*10)+1;
        //�h������x�̑������̂͏��Ȃ��A�x�����̂͑傫���h�炷
        swing_width = 30 - speed*3;
        swing_degree = 0;
        //[0-3]�̎ʐ^���w��
        select = Math.floor(Math.random()*4);
        return vertical_pos;  
    }
    
    //�ʐ^��I��
    this.getPict = function() {
      return pict[select];
    }

     //��������
     this.fall = function(w_height) {
        if (vertical_pos < w_height) {
            vertical_pos += speed;
        }
        return vertical_pos;
     }

     //�h�ꏈ��
     this.swing = function() {
       // horizontal_center_pos�𒆐S�Ƃ��č��E�ɗh���
       swing_direction = Math.sin(swing_degree/180*Math.PI);
       horizontal_pos = swing_direction * swing_width + horizontal_center_pos;
       swing_degree += 10;
       if (swing_degree >= 360) {
           swing_degree = 0;
       }
       return horizontal_pos;
     }

}





function fallingDrops() {
  //�E�B���h�E
  var window = $("body");
  var w_height = window.height();
  var w_width = window.width();
  var w_margin = 10;
  //�\���A�C�e��
  var num_items = 0;
  var max_items = 1;
  var Items = [];


  function moveAnime() {
    window = $("body");
    w_height = window.height();
    w_width = window.width();
    
        
    if (num_items < max_items) {
      var new_item = document.createElement('div');
      new_item.classList.add('drop');
      var parent = document.getElementById('anime');
      parent.appendChild(new_item);
      var new_drop = new DropItem();
      new_drop.reset(w_height, w_width, w_margin);
      $(new_item).css("background", new_drop.getPict());
      Items.push(new_drop);
      num_items++;
      
    }
        
    $(".drop").each(function(index, elem) {
      var vpos = Items[index].fall(w_height);
      if (vpos > w_height) {
        vpos = Items[index].reset(w_height, w_width, w_margin);
        $(elem).css("background", Items[index].getPict());
      }
      $(elem).css("top", vpos+"px");
      $(elem).css("left", Items[index].swing()+"px");
    });
  };
  
  setInterval(moveAnime, 100);
  document.onkeydown = keydown;
  function keydown(e){
    var key = e.keyCode;
    if (max_items <= 20) {
      if (key == 33) {
        max_items++;
      }
    }
    
  };



}


