import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './uploadModal.css'
import * as sessionActions from '../../store/session';
import upload from '../../imgs/upload.png'


function UploadModal({setHidden, setHeaderHidden}) {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  const closeModal = (e) => {
    setHidden(true)
    setHeaderHidden()
  }
  
  const stopProp = (e) => {
    e.stopPropagation()
  }
  const handleFile = ({currentTarget}) => {
      const file = currentTarget.files[0];
      setPhotoFile(file);
      if (file) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => setPhotoUrl(fileReader.result);
          }
      else setPhotoUrl(null);
  }

  const handlePfp = async e =>{
      e.preventDefault();
      const formData = new FormData();
      if (photoFile) {
          formData.append('user[photo]', photoFile)
      }
      const response = await fetch(`/api/users/${sessionUser.id}`, {
          method: "PATCH",
          body: formData
      });
      if (response.ok) {
          setPhotoFile(null);
          dispatch(sessionActions.reload());
          closeModal();
      }
  }    
  const preview = photoUrl ? <img id="pfp8" src={photoUrl} alt="" /> : <img id='pfp8' src="https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67" alt=""/>

  return (
    <div id='modal-back' onClick={closeModal}>
        <div className={`modal-upload ${sessionUser.darkMode ? 'modal-upload-dark' : ''}`} onClick={stopProp}>
            <h2 id="add-pfp">Add a profile photo</h2>
            <form className="change-pfp" onSubmit={handlePfp}>
                <div className='files-container'>
                    <img id="upload" alt="upload" src={upload}/>
                    <h2 id="add-pfp">Drag your photo here, or...</h2>
                    <label className={`custom-file-upload ${photoFile ? "uploaded" : ''}`}>
                        <input className="file-upload" type="file" onChange={handleFile}/>
                        Browse Files
                    </label>
                </div>
                <div>
                <div>
                  <h2 id="preview">Preview:</h2>
                </div>
                <div className='preview-div'>
                    {preview}
                    <h2>{sessionUser.firstName} {sessionUser.lastName}</h2>
                </div>
                    <div className='button-div'>
                        <button className='cancel-pfp' onClick={closeModal}> Cancel</button>
                        <button className={`update-pfp ${photoFile ? "uploaded" : ''}`} disabled={photoFile ? false : true}> Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default UploadModal;