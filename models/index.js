import dotenv from "dotenv";
import CaverExtKAS from "caver-js-ext-kas";

dotenv.config();
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const chainId = process.env.CHAIN_ID;
const caver = new CaverExtKAS(chainId, accessKey, secretAccessKey);



/**
 //tokenURI
 {
    "title": "Asset Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this NFT represents"
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this NFT represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        }
    }
}
 */
const blockNum = async () => {
    const num = await caver.rpc.klay.getBlockNumber();
    console.log(num);
}

blockNum();
