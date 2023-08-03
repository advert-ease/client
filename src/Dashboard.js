import { getDatabase, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import firebase from "./myfirebase";
import './App.css'

const Dashboard = () => {
  const [user, setUser] = useState(window.location.pathname.split("/")[2]);
  const [devices, setDevices] = useState([]);
  const [data, setData] = useState([]);
  const [channel,setChannels] = useState([])
  const [allAds,setAllAdds] = useState([])

  const fetchData = () => {
    const db = getDatabase();
    const usersRef = ref(db, "customers/" + user);
    onValue(usersRef, (snapshot) => {
      let newData = [];
      snapshot.forEach((snap) => {
        if (snap.key === "devices") newData = snap.val();
        setDevices(newData);
      });
    });

    const piRef = ref(db, "pi_name-cha/");

    onValue(piRef, (snapshot) => {
      const newData = [];
      // console.log(snapshot);
      snapshot.forEach((item) => {
        let x, y, z;
        // console.log(child);
        const idvlRef = ref(db, "pi_name-cha/" + item.key);
        onValue(idvlRef, (snap) => {
          snap.forEach((doc) => {
            if (doc.key === "URL") {
              z = doc.val();
            }
            if (doc.key === "channel") {
              x = doc.val();
            }
            if (doc.key === "cust_id") {
              y = doc.val();
            }
          });
        });
        newData.push({ name: item.key.trim(), ad: z, cha: x, rest: y });
        setData(newData);
      });
    });

    const chRef = ref(db, "pi_cha-status/");
    onValue(chRef, (snapshot) => {
      const newData = [];
      snapshot.forEach((item) => {
        // console.log(item.val());
        newData.push({ name: item.key, mode: item.val() });
        setChannels(newData);
        // arr1.push({name:item.key,mode:item.val()})
      });
    });

    const adRef = ref(db, "ad_name/");
    const newAd = [];
    onValue(adRef, (snapshot) => {
      snapshot.forEach((item) => {
        newAd.push(item.val());
        setAllAdds(newAd);
        // setAllAdds((i) => [...i, item.val()]);
      });
    });


  };

  useEffect(() => {
    //fetchData2();
    fetchData();
  }, []);

  // var arr=devices
  // console.log(arr);
  const handleChangeChannel = (item, e) => {
    const db = getDatabase();
    // console.log(e.target.value);
    update(ref(db, "pi_name-cha/" + item.name), {
      channel: e.target.value,
    });

    update(ref(db,"data_log/"+item.name),{
      changed_by:user,
      action:`URL changed from ${item.cha} to ${e.target.value}`
    })
  };

  const handleChangeUrl = (item, e) => {
    const db = getDatabase();
    update(ref(db,"data_log/"+item.name),{
      changed_by:user,
      action:`URL changed from ${item.URL} to ${e.target.value}`
    })
  };
console.log(data)
  return (
    <div className="dashboard">
      <h1>Welcome {user}</h1>
      <table>
        <tr>
          <th>Device</th>
          <th>Channel</th>
          <th>Ad</th>
        </tr>
        {data
          .filter(item=>devices.includes(item.name))
          ?.map((item, index) => {console.log();
            return ( 
              <tr key={index}>
                <td>{item.name}</td>
                <td className="table-cell">
                  <select
                    value={item.cha}
                    onChange={(e) => handleChangeChannel(item, e)}
                  >
                    {channel.map((item) => {
                      return <option>{item.name}</option>;
                    })}
                  </select>
                </td>
                <td className="table-cell">
                  <select
                    value={item.ad}
                    onChange={(e) => handleChangeUrl(item, e)}
                  >
                    {allAds.map((item) => {
                      return <option>{item}</option>;
                    })}
                  </select>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Dashboard;
