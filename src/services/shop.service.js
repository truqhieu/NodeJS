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
const {
  badRequestError,
  conflictRequestError,
} = require("../middlewares/error.res");
const signUpService = async ({ name, email, password }) => {
  try {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      return badRequestError('Shop is already registered with this email');
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
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });

      //Không dùng thuật toán RSA
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      console.log({ privateKey, publicKey });

      const keyTokens = await createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });
      if (!keyTokens) {
        return badRequestError("Error: Failed to create key tokens");
      }

      //Chuyển về  object publicKey

      // const publicKeyObject = crypto.createPublicKey(publicKeyString);
      // console.log(`Public Key Object: `, publicKeyObject);

      //Gọi hàm lưu vảo tokens
      const tokens = await createTokenPair(
        {
          userId: newShop._id,
          email,
        },
        publicKey,
        privateKey
      );
      console.log(`Created Token Success: `, tokens);

      return {
        code: 201,
        metadata: {
          shop: getInfoData({ fields: ["_id", "name"], object: newShop }),
          tokens,
        },
      };
    }
    return badRequestError("Shop creation failed");
  } catch (error) {
    return {
      code: "xxx",
      metadata: error.message,
      status: "error",
    };
  }
};

module.exports = { signUpService };
