export function djb2(str){
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash;
  }
  
  export function hashStringToColor(str) {
    let hash = djb2(str);
  
    let rgb = [0,0,0];
     rgb[0] = (hash & 0xFF0000) >> 16;
     rgb[1] = (hash & 0x00FF00) >> 8;
     rgb[2] = hash & 0x0000FF;
  
    // saturate:
    let max, min;
  
      if (rgb[0] > rgb[1])
      {
          max = (rgb[0] > rgb[2]) ? 0 : 2
          min = (rgb[1] < rgb[2]) ? 1 : 2;
      }
      else
      {
          max = (rgb[1] > rgb[2]) ? 1 : 2;
          let notmax = 1 + max % 2;
          min = (rgb[0] < rgb[notmax]) ? 0 : notmax;
      }
  
      rgb[max] = Math.round((rgb[max] + 255)/2);
      rgb[min] = Math.round((rgb[min])/2);
  
  
    return "#" + ("0" + rgb[0].toString(16)).substr(-2) + ("0" + rgb[1].toString(16)).substr(-2) + ("0" + rgb[2].toString(16)).substr(-2);
  }




