import { useState } from 'react'
import { uploadService } from '../services/upload.service'


export function ImgUploader({ onUploaded = null }) {


    const [imgData, setImgData] = useState({ imgUrl: null })
    const [isUploading, setIsUploading] = useState(false)


    async function uploadImg(ev) {
        ev.preventDefault()
        console.log("🚀 ~ uploadImg ~ ev:", ev)
        setIsUploading(true)


        const { secure_url } = await uploadService.uploadImg(ev)


        setImgData({ imgUrl: secure_url, })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }


    function getUploadLabel() {
        if (imgData.imgUrl) return 'Change picture?'
        return isUploading
            ? <div className="spinner-with-text">
                <div className="loader-img"></div>
                <span>Uploading...</span>
            </div>
            : 'Upload Image'
    }


    return (
        <div className='img-uploader'>
            <div >{getUploadLabel()}</div>

            <label
                onDrop={uploadImg}
                onDragOver={console.log}
            // onDragOver={ev => ev.preventDefault()}
            >
                <img src={imgData.imgUrl || 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'} style={{ width: '100px', height: '100px' }} />

                <input hidden
                    type="file"
                    onChange={uploadImg} accept="img/*" />
            </label>


        </div>
    )
}
