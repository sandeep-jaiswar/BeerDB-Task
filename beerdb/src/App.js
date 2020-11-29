import ResultTable from "./components/ResultTable";
import Pagination  from "./components/Pagination";
import { useState,useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beerDtls, setBeerDtls] = useState([]);
  const [imgs, setImgs] = useState([]);
  const indexOfLastItem=activePage*itemsPerPage;
  const indexOfFirsttItem=indexOfLastItem-itemsPerPage;
  const CurrentPage=beerDtls.slice(indexOfFirsttItem,indexOfLastItem);

  const fetchData= () =>{
    const beerAPI="https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json";
    const imgAPI="https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json";
    const getBeer=axios.get(beerAPI);
    const getImage=axios.get(imgAPI);
    axios.all([getBeer,getImage]).then(
      axios.spread((...all) =>{
        setBeerDtls(all[0].data);
        setImgs(all[1].data);
        setIsLoaded(true);
      },

        (error) => {
          setIsLoaded(true);
          setError(error);
        })
    )
  }

  useEffect(()=>{
    fetchData();
  },[])
    
  function sendImgSrc(index){
    return imgs[Math.floor(index%5)].image;
  }

  function handlePageChange(action,activePage){
    if(action==="next" && activePage<Math.floor(beerDtls.length/itemsPerPage)){
      setActivePage(activePage+1);
    }else if(action==="prev" && activePage>1){
      setActivePage(activePage-1);
    }
    console.log(setItemsPerPage);
  } 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loader"></div>;
  } else{
        return (
          <div className="App container mt-5">
              <div style={{margin:"auto"}}>
                    <Pagination activePage={activePage} itemsPerPage={ itemsPerPage } totalItems={ beerDtls.length } handlePageChange={handlePageChange}></Pagination>
              </div>
              <table className="styled-table" >
                <thead>
                  <tr>
                      <th>Logo</th>
                      <th>Name</th>
                      <th>Style</th>
                      <th>Sbv</th>
                      <th>Ibu</th>
                      <th>Id</th>
                      <th>Ounces</th>
                  </tr>
                </thead>
                <tbody>
                    {CurrentPage.map(
                      (beerDtls,index) => {
                        return <ResultTable index={index} sendImgSrc={sendImgSrc} key={beerDtls.id} beerDtls={beerDtls}></ResultTable>
                      }
                    )} 
                </tbody>
              </table>
          </div>
        );
  }
}

export default App;
