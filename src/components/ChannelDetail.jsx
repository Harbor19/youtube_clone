import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { ChannelCard, Videos } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items))
  }, [id]);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div 
          style={{ 
            background: 'linear-gradient(90deg, rgba(191,172,130,1) 0%, rgba(95,112,170,1) 50%, rgba(150,121,125,1) 99%)',
            zIndex: 10,
            height: '300px'
          }}
        />

        <ChannelCard channelDetail={channelDetail} marginTop='-110px'/>   

      </Box>
      <Box display='flex' p='2' >
        <Box sx={{ mr: {sm:'100px'}}} />
          <Videos videos={videos}/>

      </Box>

    </Box>
  )
}

export default ChannelDetail;