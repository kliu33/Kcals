import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as channelActions from '../../../store/channels';
import './options.css'

function Owner(props) {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        return dispatch(channelActions.deleteChannel(props.channel.id));
      }

    return (
      <div>
            <div>
                <span onClick={handleDelete}> Leave Channel</span>
            </div>
      </div>
    );
  }
  
  export default Owner;

  