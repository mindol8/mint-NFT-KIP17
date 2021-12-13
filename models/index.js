import dotenv from "dotenv";
import CaverExtKAS from "caver-js-ext-kas";

dotenv.config();
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const chainId = process.env.CHAIN_ID;
const caver = new CaverExtKAS(chainId, accessKey, secretAccessKey);
let account = process.env.ACCOUNT_ADDRESS;
let tokenIdNum = 0;
let token = {};
const isAddress = (address) => {
    try {
        if (caver.utils.isAddress(address)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`check address error: ${error}`);
        return false;
    }
}

const deploy = (name, symbol, account) => {
    try {
        return caver.kct.kip17.deploy({
            name: name,
            symbol: symbol,
        }, account)
    } catch (error) {
        console.log(`depoly error: ${error}`);
        return false;
    }
}

const mint = async ({ name, symbol, address, description, img }) => {
    if (!isAddress(address)) {
        return [false, "올바른 주소형식이 아닙니다."];
    }
    const tokenURI = {
        "title": `${symbol} / ${name}`,
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": name
            },
            "description": {
                "type": "string",
                "description": description
            },
            "image": {
                "type": "string",
                "description": JSON.stringify(img)
            }

        }

    }

    const contract = await deploy(name, symbol, account);
    if (!contract) {
        return [false, "Deploy fail"];;
    }
    const contractAddress = contract.options.address;
    token[address] = token[address] || [];
    token[address].push(contractAddress);
    try {
        const kip17 = new caver.kct.kip17(contractAddress);

        const receipt = await kip17.mintWithTokenURI(address, tokenIdNum++, JSON.stringify(tokenURI), { from: account });
        if (receipt) {
            //console.log(receipt);
            return [true, receipt];
        }
        return [false, "Minting fail"];

    } catch (error) {
        console.log(`mint error: ${error}`);
        return [false, "ERROR"];
    }
}

const getNFT = async (address) => {
    return token[address];
}

export { mint, getNFT };
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
