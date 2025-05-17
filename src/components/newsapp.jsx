import React, { useEffect, useState } from 'react'
import Card from './card'
import "../css/newsapp.css"
import LeftPanel from './leftpanel';

const newsapp = () => {
    const [search, setSearch] = useState("virat kohli");
    const [newsData, setNewsData] = useState(null)
    const [loading, setLoading] = useState(false);
    const API_KEY = "pub_875800084cc53847a44cdeb6c7811fd89792d";

    
 const fetchData = async (query) => {
  setLoading(true);
  try {
    const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${query}`);
    const jsonData = await response.json();

    if (jsonData.results && jsonData.results.length > 0) {
      const articles = jsonData.results.slice(0, 10);
      setNewsData(articles);
    } else {
      setNewsData([]); 
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setNewsData([]); 
  }
  setLoading(false);
};


const getData = () => {
    fetchData(search);
};

    useEffect(()=>{
        getData()
    },[])

    const handleInput = (e) =>{
        console.log(e.target.value);
        setSearch(e.target.value)
        
    }
    const userInput = async (event) => {
    const category = event.target.value;
    setSearch(category);
    await fetchData(category);
};

  return (
    <div className="main">
       <div style={{display:'flex',flexDirection:'column',rowGap:'4px'}}>
        <h1 style={{backgroundColor:'rgb(20, 45, 118)',color:'white'}}><marquee  behaviour ="alternate"  direction="left"scrollamount="15" loop="infinite">  Breaking News &nbsp; &nbsp; &nbsp;   Breaking News &nbsp; &nbsp; &nbsp;  Breaking News &nbsp; &nbsp; &nbsp;  Breaking News &nbsp; &nbsp; &nbsp;  Breaking News &nbsp; &nbsp; &nbsp;</marquee></h1>
 
        <nav>
            <div>
                <h1 style={{color:'white',fontSize:'40px',fontWeight:'400px'}}>News Waves</h1>
            </div>
          
            <div className='searchBar'>
                <input type='text' placeholder='Search News' value={search} onChange={handleInput}/>
                <button onClick={getData}>Search</button>
            </div>
        </nav>
        </div>
        <div>
            <p className='head'>From Local to Global – Instantly</p>
        </div>
        <div className='categoryBtn'>
            <button onClick={userInput} value="sports">Sports</button>
            <button onClick={userInput} value="politics">Politics</button>
            <button onClick={userInput} value="entertainment">Entertainment</button>
            <button onClick={userInput} value="health">Health</button>
            <button onClick={userInput} value="fitness">Fitness</button>
        </div>

       <div className="mainContent">
 <div className="leftPanel">
  <LeftPanel />
</div>

  <div className="rightPanel">
    {loading && <p>Loading...</p>}
    {!loading && newsData && newsData.length > 0 && <Card data={newsData} />}
    {!loading && newsData && newsData.length === 0 && (
      <p style={{ color: 'red' }}>❌ No News Found</p>
    )}
  </div>
</div>
    </div>
  )
}

export default newsapp