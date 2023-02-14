import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as channelActions from '../../../store/channels';
import ChannelFormPage from '../../Modal/modal';
import './options.css'

function Owner(props) {
    const dispatch = useDispatch();
    const channel = props.channel

    const handleDelete = (e) => {
        return dispatch(channelActions.deleteChannel(props.channel.id));
      }

    const [hidden, setHidden] = useState(true)
    const form = hidden ? null : <ChannelFormPage channel={props.channel} setHidden={setHidden}/>
    
    const handleEdit = (e) => {
      e.preventDefault();
      setHidden(!hidden)
    }

    return (
      <div>
            <div>
                <span onClick={handleDelete}> Delete Channel</span>
            </div>
            <div> 
                <span onClick={handleEdit}> Edit Channel</span>
            </div>
            {form}
      </div>
    );
  }
  
  export default Owner;

  