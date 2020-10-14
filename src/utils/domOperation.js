/**
 * dom节点操作
 */

export const addClass= function(el=window, className){
    el.classList.add(className)
  }

export const removeClass= function(el=window, className){
    el.classList.remove(className);
  }
