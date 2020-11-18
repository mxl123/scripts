var tid = location.pathname == '/f' ? location.search.match(/kz=([^&]*)/)[1] : location.pathname.match(/\/p\/(\d+)/)[1];
location.replace(' http://byokpg.smartapps.cn/pages/pb/pb?tid='+tid);