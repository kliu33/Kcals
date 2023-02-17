import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as channelActions from '../../../store/channels';
import ChannelFormPage from '../../Modal/modal';
import './options.css'

function Owner(props) {
    const dispatch = useDispatch();

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
                <span onClick={handleDelete} className='option'> Delete Channel</span>
            </div>
            <br></br>
            <div> 
                <span onClick={handleEdit} className='option'> Edit Channel</span>
            </div>
            {form}
      </div>
    );
  }
  
  export default Owner;

  