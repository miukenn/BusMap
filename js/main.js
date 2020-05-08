let markers = [];
let gmap_canvas;
let map_div = document.getElementById('gmap_canvas'); 

function initMap(){
  gmap_canvas = new google.maps.Map(map_div,{
    center: {lat: 39.74327856, lng:140.17949062},
    zoom : 12,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  });
  
  stopText();
}

const timeTableContent = new Vue({
  el: '#time-table-content',
  data: {
    point:{
      stop_id: "",
      stop_name: "",
      stop_desc: "",
      trip_id: "",
      arrival_time: "",
      depature_time: "",
      // times: ""
    }
  }
})

const stopText = () => {

  const stopsRef = firebase
    .database()
    .ref('stops');

  stopsRef.off('child_added');

  stopsRef.on('child_added', (stopSnapshot) => {
    const stopId = stopSnapshot.key;
    const stop = stopSnapshot.val();
    
    console.log(stopId);
    console.log(stop);

    const details = stop.details;
    const time_tables = stop.time_tables;
    
    const options ={
      map: gmap_canvas,
      position: details.latlng,
      animation: google.maps.Animation.DROP
    };
    const marker = new google.maps.Marker(options);
    
    marker.addListener('click', function(){
      
      // Vue timeTaleContentのデータに代入。
      // FIXME ************
      timeTableContent.point = {
        stop_id: details.stop_id,
        stop_name: details.stop_name,
        stop_desc: details.stop_desc,
        trip_id: time_tables.trip_id,
        times: time_tables.times
      };
      
      
      
      
      $('#exampleModal').modal(event);
    });
    markers.push(marker);
  });
};


/*
データ構造

// バス停のデータ
stops/
    stopId/ -- firebaseのキーとする
    　details/
        {
          stop_id: "藤埼", 
          stop_name: "藤埼", 
          stop_desc:  "フリー乗降区間内",
          latlng: {lat: 39.74327856, lng:140.17949062}
        },
      time_tables/  
        trip_id: 路線名 ex) "循環1"
        times: [
            {arrival_time: 到着時刻,
            depature_time: 出発時効},
            {arrival_time: 到着時刻,
            depature_time: 出発時効},
            {arrival_time: 到着時刻,
            depature_time: 出発時効},
        ]        
    // ...  

1. stopsのrefで呼び出し。
2. 取得したオブジェクトをdetailsを使ってピンを作成
3. ピンにtime_tablesのオブジェクトを関連付ける
4. ピンをクリックされたらtime_tablesの内容をvueでモーダルに反映

*/






// function dropMarkers(){
//   let i=0;
//   for (i=0; i < lcnt; i++){
    
//     const options ={
//       map: gmap_canvas,
//       position: points[i].latlng,
//       animation: google.maps.Animation.DROP
//     };
//     const marker = new google.maps.Marker(options);
    
//     marker.data = points[i];
//     marker.addListener('click', function(){
//       // console.log(marker.data.stop_id);
  
//         timeTableContent.point = {
//       stop_id: marker.data.stop_id,
//       stop_name: marker.data.stop_name,
//       stop_desc: marker.data.stop_desc 
//   };
//       $('#exampleModal').modal(event);
//     });
//     markers.push(marker);
//   }
// }




const stopsdata = firebase
    .database()
    .ref('stops')
    .set({
      stopId1:{
        details:
          {
            stop_id: "藤埼", 
            stop_name: "藤埼", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.74327856, lng:140.17949062}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:15",
            depature_time: "12:15"},
            {arrival_time: "13:36",
            depature_time: "13:36"},
            {arrival_time: "17:21",
            depature_time: "17:21"},
            {arrival_time: "6:32",
            depature_time: "6:32"},
            {arrival_time: "8:28",
            depature_time: "8:28"},
            {arrival_time: "12:31",
            depature_time: "12:31"},
            {arrival_time: "16:59",
            depature_time: "16:59"},
            {arrival_time: "17:42",
            depature_time: "17:42"},
            {arrival_time: "13:21",
            depature_time: "13:21"},
            {arrival_time: "17:21",
            depature_time: "17:21"},
            {arrival_time: "8:28",
            depature_time: "8:28"},
            {arrival_time: "12:18",
            depature_time: "12:18"},
            {arrival_time: "16:48",
            depature_time: "16:48"},
          ]
        }
      },
      stopId2:{
        details:
          {
            stop_id: "仁部上丁", 
            stop_name: "藤埼", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.7476852, lng:140.19216604 }
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:18",
            depature_time: "12:18"},
            {arrival_time: "13:39",
            depature_time: "13:39"},
            {arrival_time: "17:24",
            depature_time: "17:24"},
            {arrival_time: "6:30",
            depature_time: "6:30"},
            {arrival_time: "8:25",
            depature_time: "8:25"},
            {arrival_time: "12:38",
            depature_time: "12:38"},
            {arrival_time: "16:55",
            depature_time: "16:55"},
            {arrival_time: "17:35",
            depature_time: "17:35"},
            {arrival_time: "13:24",
            depature_time: "13:24"},
            {arrival_time: "17:24",
            depature_time: "17:24"},
            {arrival_time: "8:25",
            depature_time: "8:25"},
            {arrival_time: "12:15",
            depature_time: "12:15"},
            {arrival_time: "16:45",
            depature_time: "16:45"},
          ]
        }
      },
      stopId3:{
        details:
          {
            stop_id: "木曽石", 
            stop_name: "木曽石", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.76585265, lng:140.19216604 }
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:18",
            depature_time: "12:18"},
            {arrival_time: "13:39",
            depature_time: "13:39"},
            {arrival_time: "17:24",
            depature_time: "17:24"},
            {arrival_time: "6:30",
            depature_time: "6:30"},
            {arrival_time: "8:25",
            depature_time: "8:25"},
            {arrival_time: "12:38",
            depature_time: "12:38"},
            {arrival_time: "16:55",
            depature_time: "16:55"},
            {arrival_time: "17:35",
            depature_time: "17:35"},
            {arrival_time: "13:24",
            depature_time: "13:24"},
            {arrival_time: "17:24",
            depature_time: "17:24"},
            {arrival_time: "8:25",
            depature_time: "8:25"},
            {arrival_time: "12:15",
            depature_time: "12:15"},
            {arrival_time: "16:45",
            depature_time: "16:45"},
          ]
        }
      },
        stopId4:{
        details:
          {
            stop_id: "木曽石下丁", 
            stop_name: "木曽石下丁", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.76533602, lng:140.20821901 }
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:23",
            depature_time: "12:23"},
            {arrival_time: "13:44",
            depature_time: "13:44"},
            {arrival_time: "6:24",
            depature_time: "6:24"},
            {arrival_time: "17:29",
            depature_time: "17:29"},
            {arrival_time: "6:24",
            depature_time: "6:24"},
            {arrival_time: "8:24",
            depature_time: "8:24"},
            {arrival_time: "12:23",
            depature_time: "12:23"},
            {arrival_time: "16:50",
            depature_time: "16:50"},
            {arrival_time: "17:30",
            depature_time: "17:30"},
            {arrival_time: "13:29",
            depature_time: "13:29"},
            {arrival_time: "8:20",
            depature_time: "8:20"},
            {arrival_time: "12:10",
            depature_time: "12:10"},
            {arrival_time: "16:40",
            depature_time: "16:40"},
          ]
        }
      },
      stopId5:{
        details:
          {
            stop_id: "堂の前", 
            stop_name: "堂の前", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.76073555, lng:140.19924507 }
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "13:41",
            depature_time: "13:41"},
            {arrival_time: "17:29",
            depature_time: "17:29"},
            {arrival_time: "6:27",
            depature_time: "6:27"},
            {arrival_time: "8:23",
            depature_time: "8:23"},
            {arrival_time: "12:26",
            depature_time: "12:26"},
            {arrival_time: "16:53",
            depature_time: "16:53"},
            {arrival_time: "13:26",
            depature_time: "13:26"},
            {arrival_time: "8:23",
            depature_time: "8:23"},
            {arrival_time: "12:13",
            depature_time: "12:13"},
            {arrival_time: "16:43",
            depature_time: "16:43"},
          ]
        }
      },
        stopId6:{
        details:
          {
            stop_id: "和岱入口", 
            stop_name: "和岱入口", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.75817163, lng:140.19701567}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:19",
            depature_time: "12:19"},
            {arrival_time: "13:40",
            depature_time: "13:40"},
            {arrival_time: "17:25",
            depature_time: "17:25"},
            {arrival_time: "6:28",
            depature_time: "6:28"},
            {arrival_time: "8:24",
            depature_time: "8:24"},
            {arrival_time: "12:27",
            depature_time: "12:27"},
            {arrival_time: "16:54",
            depature_time: "16:54"},
            {arrival_time: "17:34",
            depature_time: "17:34"},
            {arrival_time: "13:25",
            depature_time: "13:25"},
            {arrival_time: "17:26",
            depature_time: "17:26"},
            {arrival_time: "8:24",
            depature_time: "8:24"},
            {arrival_time: "12:14",
            depature_time: "12:14"},
             {arrival_time: "16:44",
            depature_time: "16:44"},
          ]
        }
      },
      stopId7:{
        details:
          {
            stop_id: "公民館前", 
            stop_name: "公民館前", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.740101, lng:140.17839137}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:21",
            depature_time: "12:21"},
            {arrival_time: "13:42",
            depature_time: "13:42"},
            {arrival_time: "17:27",
            depature_time: "17:27"},
            {arrival_time: "6:26",
            depature_time: "6:26"},
            {arrival_time: "8:22",
            depature_time: "8:22"},
            {arrival_time: "12:55",
            depature_time: "12:55"},
            {arrival_time: "16:52",
            depature_time: "16:52"},
            {arrival_time: "17:32",
            depature_time: "17:32"},
            {arrival_time: "13:27",
            depature_time: "13:27"},
            {arrival_time: "17:27",
            depature_time: "17:27"},
            {arrival_time: "8:22",
            depature_time: "8:22"},
            {arrival_time: "12:12",
            depature_time: "12:12"},
             {arrival_time: "16:42",
            depature_time: "16:42"},
          ]
        }
      },
      stopId8:{
        details:
          {
            stop_id: "八田上丁", 
            stop_name: "八田上丁", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.74109851, lng:140.17839137}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:14",
            depature_time: "12:14"},
            {arrival_time: "13:35",
            depature_time: "13:35"},
            {arrival_time: "17:20",
            depature_time: "17:20"},
            {arrival_time: "6:33",
            depature_time: "6:33"},
            {arrival_time: "8:32",
            depature_time: "8:32"},
            {arrival_time: "12:32",
            depature_time: "12:32"},
            {arrival_time: "16:59",
            depature_time: "16:59"},
            {arrival_time: "17:39",
            depature_time: "17:39"},
            {arrival_time: "13:20",
            depature_time: "13:20"},
            {arrival_time: "17:20",
            depature_time: "17:20"},
            {arrival_time: "8:29",
            depature_time: "8:29"},
            {arrival_time: "12:19",
            depature_time: "12:19"},
             {arrival_time: "16:49",
            depature_time: "16:49"},
          ]
        }
      },
      stopId9:{
        details:
          {
            stop_id: "清和病院前", 
            stop_name: "清和病院前", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.740101, lng:140.168136}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:11",
            depature_time: "12:11"},
            {arrival_time: "13:32",
            depature_time: "13:32"},
            {arrival_time: "17:17",
            depature_time: "17:17"},
            {arrival_time: "6:36",
            depature_time: "6:36"},
            {arrival_time: "8:32",
            depature_time: "8:32"},
            {arrival_time: "12:35",
            depature_time: "12:35"},
            {arrival_time: "17:02",
            depature_time: "16:02"},
            {arrival_time: "17:42",
            depature_time: "17:42"},
            {arrival_time: "13:17",
            depature_time: "13:17"},
            {arrival_time: "17:17",
            depature_time: "17:17"},
            {arrival_time: "8:32",
            depature_time: "8:32"},
            {arrival_time: "12:22",
            depature_time: "12:22"},
             {arrival_time: "16:52",
            depature_time: "16:52"},
          ]
        }
      },
      stopId10:{
        details:
          {
            stop_id: "谷内佐渡中丁", 
            stop_name: "谷内佐渡中丁", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.725078, lng:140.153038}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:06",
            depature_time: "12:06"},
            {arrival_time: "13:27",
            depature_time: "13:27"},
            {arrival_time: "17:12",
            depature_time: "17:12"},
            {arrival_time: "6:42",
            depature_time: "6:42"},
            {arrival_time: "8:37",
            depature_time: "8:37"},
            {arrival_time: "12:40",
            depature_time: "12:40"},
            {arrival_time: "17:07",
            depature_time: "16:07"},
            {arrival_time: "17:47",
            depature_time: "17:47"},
            {arrival_time: "13:12",
            depature_time: "13:12"},
            {arrival_time: "17:12",
            depature_time: "17:12"},
            {arrival_time: "8:37",
            depature_time: "8:37"},
            {arrival_time: "12:27",
            depature_time: "12:27"},
             {arrival_time: "16:57",
            depature_time: "16:57"},
          ]
        }
      },
      stopId11:{
        details:
          {
            stop_id: "谷内佐渡", 
            stop_name: "谷内佐渡", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.725397, lng:140.149697}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:05",
            depature_time: "12:05"},
            {arrival_time: "13:26",
            depature_time: "13:26"},
            {arrival_time: "17:11",
            depature_time: "17:11"},
            {arrival_time: "6:42",
            depature_time: "6:42"},
            {arrival_time: "8:38",
            depature_time: "8:38"},
            {arrival_time: "12:41",
            depature_time: "12:41"},
            {arrival_time: "17:08",
            depature_time: "16:08"},
            {arrival_time: "17:48",
            depature_time: "17:48"},
            {arrival_time: "13:11",
            depature_time: "13:11"},
            {arrival_time: "17:11",
            depature_time: "17:11"},
            {arrival_time: "8:38",
            depature_time: "8:38"},
            {arrival_time: "12:28",
            depature_time: "12:28"},
             {arrival_time: "16:58",
            depature_time: "16:58"},
          ]
        }
      },
      stopId12:{
        details:
          {
            stop_id: "大学病院前", 
            stop_name: "大学病院前", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.729515, lng:140.149773}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:04",
            depature_time: "12:04"},
            {arrival_time: "13:25",
            depature_time: "13:25"},
            {arrival_time: "17:10",
            depature_time: "17:10"},
            {arrival_time: "6:43",
            depature_time: "6:43"},
            {arrival_time: "8:39",
            depature_time: "8:39"},
            {arrival_time: "12:42",
            depature_time: "12:42"},
            {arrival_time: "17:09",
            depature_time: "16:09"},
            {arrival_time: "17:49",
            depature_time: "17:49"},
            {arrival_time: "13:10",
            depature_time: "13:10"},
            {arrival_time: "17:10",
            depature_time: "17:10"},
            {arrival_time: "8:39",
            depature_time: "8:39"},
            {arrival_time: "12:29",
            depature_time: "12:29"},
             {arrival_time: "16:59",
            depature_time: "16:59"},
          ]
        }
      },
        stopId13:{
        details:
          {
            stop_id: "関上", 
            stop_name: "関上", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.69779434, lng:140.15664463}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:46",
            depature_time: "12:46"},
            {arrival_time: "18:36",
            depature_time: "18:36"},
            {arrival_time: "7:29",
            depature_time: "7:29"},
            {arrival_time: "10:59",
            depature_time: "10:59"},
            {arrival_time: "14:49",
            depature_time: "14:49"},
            {arrival_time: "12:44",
            depature_time: "12:44"},
            {arrival_time: "18:44",
            depature_time: "18:44"},
            {arrival_time: "7:46",
            depature_time: "7:46"},
            {arrival_time: "15:24",
            depature_time: "15:24"},
          ]
        }
      },
      stopId14:{
        details:
          {
            stop_id: "大杉沢", 
            stop_name: "大杉沢", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.69805299, lng:140.16755367}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:54",
            depature_time: "12:54"},
            {arrival_time: "18:44",
            depature_time: "18:44"},
            {arrival_time: "7:21",
            depature_time: "7:21"},
            {arrival_time: "10:51",
            depature_time: "10:51"},
            {arrival_time: "14:41",
            depature_time: "14:41"},
            {arrival_time: "12:52",
            depature_time: "12:52"},
            {arrival_time: "18:38",
            depature_time: "18:38"},
            {arrival_time: "15:16",
            depature_time: "15:16"},
          ]
        }
      },
      stopId15:{
        details:
          {
            stop_id: "中小山田", 
            stop_name: "中小山田", 
            stop_desc:  "フリー乗降区間内",
            latlng: {lat: 39.69670803, lng:140.18242668}
            },
        time_tables:
        {
          trip_id:"木曽石",
          times: [
            {arrival_time: "12:58",
            depature_time: "12:58"},
            {arrival_time: "18:48",
            depature_time: "18:48"},
            {arrival_time: "7:17",
            depature_time: "7:17"},
            {arrival_time: "10:45",
            depature_time: "10:45"},
            {arrival_time: "14:43",
            depature_time: "14:43"},
            {arrival_time: "12:56",
            depature_time: "12:56"},
            {arrival_time: "18:56",
            depature_time: "18:56"},
            {arrival_time: "15:12",
            depature_time: "15:12"},
          ]
        }
      },
    });

let points = [
      {stop_id: "藤埼", stop_name: "藤埼", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.74327856, lng:140.17949062}},
			{stop_id: "仁部上丁", stop_name: "仁部上丁", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.7476852, lng:140.19216604 }},
			{stop_id: "木曽石", stop_name: "木曽石", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.76585265, lng:140.21012574}},
			{stop_id: "木曽石下丁", stop_name: "木曽石下丁", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.76533602, lng:140.20821901}},
			{stop_id: "堂の前", stop_name: "堂の前", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.76073555, lng:140.19924507}},
			{stop_id: "和岱入口", stop_name: "和岱入口", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.75817163, lng:140.19701567}},
			{stop_id: "公民館前", stop_name: "公民館前", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.740101, lng:140.17839137 }},
			{stop_id: "八田上丁", stop_name: "八田上丁", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.74109851, lng:140.17839137}},
			{stop_id: "清和病院前", stop_name: "清和病院前", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.740101, lng:140.168136}},
			{stop_id: "谷内佐渡中丁", stop_name: "谷内佐渡中丁", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.725078 , lng:140.153038}},
			{stop_id: "谷内佐渡", stop_name: "谷内佐渡", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.725397 , lng:140.149697 }},
			{stop_id: "大学病院前", stop_name: "大学病院前", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.729515, lng:140.149773}},
			{stop_id: "関上", stop_name: "関上", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.69779434, lng:140.15664463}},
			{stop_id: "大杉沢", stop_name: "大杉沢", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.69805299, lng:140.16755367}},
			{stop_id: "中小山田", stop_name: "中小山田", stop_desc:  "フリー乗降区間内",latlng:{lat: 39.69670803, lng:140.18242668}},
];