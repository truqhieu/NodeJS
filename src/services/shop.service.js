const shopModel = require("../models/shop.model");
const bycrypt = require("bcrypt");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
const crypto = require("crypto");
const { createKeyToken } = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const signUpService = async ({ name, email, password }) => {
  try {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      return {
        code: "xxx",
        metadata: "Email already exists",
        status: "error",
      };
    }

    const passwordHash = await bycrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    if (newShop) {
      //create public key, private key
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });
      console.log({ privateKey, publicKey });

      const publicKeyString = await createKeyToken({
        userId: newShop._id,
        publicKey,
      });
      if (!publicKeyString) {
        return {
          code: "xxx",
          message: "publicKeyString error",
        };
      }

      //Chuyển về  object publicKey
      const publicKeyObject = crypto.createPublicKey(publicKeyString);
      console.log(`Public Key Object: `, publicKeyObject);
      //Gọi hàm lưu vảo tokens
      const tokens = await createTokenPair(
        {
          userId: newShop._id,
          email,
        },
        publicKeyString,
        privateKey
      );
      console.log(`Created Token Success: `, tokens);

      return {
        code: 201,
        metadata: {
          shop: getInfoData({fields : ['_id','name'],object:newShop}),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: "Shop creation failed",
      status: "error",
    };
  } catch (error) {
    return {
      code: "xxx",
      metadata: error.message,
      status: "error",
    };
  }
};

module.exports = { signUpService };
