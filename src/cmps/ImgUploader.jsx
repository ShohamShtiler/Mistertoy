import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import  imgUploader from '../assets/style/img/image-uploader.png'


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
                <img src={imgData.imgUrl || imgUploader } style={{ width: '60px', height: '60px' }} />

                <input hidden
                    type="file"
                    onChange={uploadImg} accept="img/*" />
            </label>


        </div>
    )
}
