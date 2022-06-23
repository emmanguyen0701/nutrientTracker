/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 3000,\n  jwtSecret: process.env.JWT_SECRET || '...',\n  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || \"mongodb+srv://emma2:9V8X3Q86aCUQVvhi@cluster0.pe3wy.mongodb.net/nutrientsTracker?retryWrites=true&w=majority\"\n};\nconst _default = config;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(config, \"config\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/config/config.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/config/config.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./config/config.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/config */ \"./config/config.js\");\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var _helpers_decodeHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/decodeHelper */ \"./server/helpers/decodeHelper.js\");\n/* harmony import */ var _helpers_decodeHelper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_helpers_decodeHelper__WEBPACK_IMPORTED_MODULE_4__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\nconst postSignin = async (req, res) => {\n  try {\n    const credentials = req.body;\n    const authObj = _helpers_decodeHelper__WEBPACK_IMPORTED_MODULE_4___default().decodeJwt(credentials.credential); // { payload: { email, name } }\n\n    const {\n      email,\n      name,\n      sub\n    } = authObj.payload; // create signature using google id\n\n    const token = await jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(sub, _config_config__WEBPACK_IMPORTED_MODULE_2__.default.jwtSecret);\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_3__.default.findOne({\n      gid: sub\n    }).exec();\n\n    if (!user) {\n      user = new _models_user_model__WEBPACK_IMPORTED_MODULE_3__.default({\n        email: email,\n        name: name,\n        gid: sub\n      });\n      await user.save();\n    } //establish user session\n\n\n    res.cookie('t', token, {\n      httpOnly: true\n    });\n    return res.status(200).json({\n      token,\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.email\n      }\n    });\n  } catch (err) {\n    console.log(\"from postSignin \", err);\n  }\n};\n\nconst signout = async (req, res) => {\n  try {\n    res.clearCookie('t');\n    return res.status(200).json({\n      message: 'sign out successful.'\n    });\n  } catch (err) {\n    console.log(err);\n  }\n};\n\nconst isAuthenticated = express_jwt__WEBPACK_IMPORTED_MODULE_1___default()({\n  secret: _config_config__WEBPACK_IMPORTED_MODULE_2__.default.jwtSecret,\n  algorithms: ['HS256'],\n  requestProperty: 'auth' //decoded token saved in req.auth = '105064005930977338430'\n\n});\n\nconst hasAuthorization = (req, res, next) => {\n  if (req.auth && req.user && req.auth === req.user.gid) {\n    next();\n  } else {\n    return res.status(401).json({\n      error: 'No authorization'\n    });\n  }\n};\n\nconst _default = {\n  postSignin,\n  signout,\n  isAuthenticated,\n  hasAuthorization\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(postSignin, \"postSignin\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/auth.controller.js\");\n  reactHotLoader.register(signout, \"signout\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/auth.controller.js\");\n  reactHotLoader.register(isAuthenticated, \"isAuthenticated\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/auth.controller.js\");\n  reactHotLoader.register(hasAuthorization, \"hasAuthorization\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/auth.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/auth.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/diary.controller.js":
/*!************************************************!*\
  !*** ./server/controllers/diary.controller.js ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _models_food_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/food.model */ \"./server/models/food.model.js\");\n/* harmony import */ var _models_diary_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/diary.model */ \"./server/models/diary.model.js\");\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var _models_nutritionValue_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/nutritionValue.model */ \"./server/models/nutritionValue.model.js\");\n/* harmony import */ var _helpers_removeTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/removeTime */ \"./server/helpers/removeTime.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\nconst getDiary = async (req, res) => {\n  try {\n    var _diary$;\n\n    // get the date selected from the query\n    const dateSelected = req.query.added_on; // find diary belongs to the user making request at chosen date\n\n    const diary = await _models_diary_model__WEBPACK_IMPORTED_MODULE_1__.default.find({\n      $and: [{\n        user: req.params.userId\n      }, {\n        added_on: dateSelected\n      }]\n    });\n\n    if (diary.length === 0) {\n      return res.status(400).json({\n        error: 'Diary not found.'\n      });\n    } // populate the food with nutrient values \n\n\n    diary[0].food = await Promise.all((_diary$ = diary[0]) === null || _diary$ === void 0 ? void 0 : _diary$.food.map(async f => {\n      f = await _models_food_model__WEBPACK_IMPORTED_MODULE_0__.Food.findById(f._id).populate('nutrients', 'nutrientId nutrientName unitName value');\n      f.nutrientValues = f.nutrients;\n      return f;\n    }));\n    return res.status(200).json(diary[0]);\n  } catch (err) {\n    console.log(\"From backend getDiary: \", err);\n  }\n};\n\nconst addFoodToDiary = async (req, res) => {\n  const {\n    name,\n    description,\n    nutrients\n  } = req.body; // find food\n  // if not found create food and nutritionValue\n  // else add food to diary\n\n  try {\n    let nF;\n    let food = await _models_food_model__WEBPACK_IMPORTED_MODULE_0__.Food.findOne({\n      name: name\n    }).exec();\n\n    if (!food) {\n      food = new _models_food_model__WEBPACK_IMPORTED_MODULE_0__.Food({\n        name,\n        description\n      });\n      await food.save(); // reconstruct the data to allow manipulation at later stage\n\n      if (!!(nutrients !== null && nutrients !== void 0 && nutrients.length)) {\n        for (const nutrient of nutrients) {\n          if (nutrient) {\n            let {\n              nutrientId,\n              nutrientName,\n              unitName,\n              value\n            } = nutrient;\n\n            if (nutrientId === 2000 || nutrientId === 1063) {\n              nutrientName = 'Sugars';\n              nutrientId = 2000;\n            }\n\n            if (nutrientId === 1258) {\n              nutrientName = 'Saturated Fat';\n            }\n\n            if (nutrientId === 1093) {\n              nutrientName = 'Salt';\n            }\n\n            const nutrientInDb = new _models_nutritionValue_model__WEBPACK_IMPORTED_MODULE_3__.NutritionValue({\n              nutrientId,\n              nutrientName: nutrientName,\n              unitName,\n              value,\n              food: food._id\n            });\n            await nutrientInDb.save();\n          }\n        }\n      }\n\n      nF = await _models_food_model__WEBPACK_IMPORTED_MODULE_0__.Food.findById(food._id).populate('nutrients', 'nutrientId nutrientName unitName value');\n\n      for (const n of nF.nutrients) {\n        nF.nutrientValues.push(n);\n      }\n\n      await nF.save();\n    } else {\n      nF = await _models_food_model__WEBPACK_IMPORTED_MODULE_0__.Food.findById(food._id).populate('nutrients', 'nutrientId nutrientName unitName value');\n    } // find diary that belongs to user\n\n\n    const user = await _models_user_model__WEBPACK_IMPORTED_MODULE_2__.default.findOne({\n      gid: req.auth\n    }).exec();\n    let diary = await _models_diary_model__WEBPACK_IMPORTED_MODULE_1__.default.find({\n      $and: [{\n        user: user\n      }, {\n        added_on: (0,_helpers_removeTime__WEBPACK_IMPORTED_MODULE_4__.default)(new Date())\n      }]\n    });\n\n    if (!!diary.length) {\n      diary[0].food.push(nF);\n      await diary[0].save();\n    } else {\n      diary = new _models_diary_model__WEBPACK_IMPORTED_MODULE_1__.default({\n        food: nF,\n        user: user\n      });\n      await diary.save();\n    }\n\n    return res.status(200).json(diary);\n  } catch (err) {\n    console.log(\"From backend addFoodToDiary: \", err);\n  }\n};\n\nconst deleteItem = async (req, res) => {\n  try {\n    const user = await _models_user_model__WEBPACK_IMPORTED_MODULE_2__.default.findById(req.params.userId).exec();\n    const diary = await _models_diary_model__WEBPACK_IMPORTED_MODULE_1__.default.find({\n      $and: [{\n        user: user\n      }, {\n        added_on: (0,_helpers_removeTime__WEBPACK_IMPORTED_MODULE_4__.default)(new Date())\n      }]\n    });\n    if (diary.length === 0) return res.status(400).json({\n      error: 'Diary not found.'\n    });\n    const index = diary[0].food.findIndex(f => f._id.toString() === req.params.itemId);\n    diary[0].food.splice(index, 1);\n    await diary[0].save();\n    return res.json({\n      message: 'item deleted'\n    });\n  } catch (err) {\n    console.log(\"From backend deleteItem: \", err);\n  }\n};\n\nconst _default = {\n  getDiary,\n  addFoodToDiary,\n  deleteItem\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(getDiary, \"getDiary\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/diary.controller.js\");\n  reactHotLoader.register(addFoodToDiary, \"addFoodToDiary\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/diary.controller.js\");\n  reactHotLoader.register(deleteItem, \"deleteItem\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/diary.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/diary.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/controllers/diary.controller.js?");

/***/ }),

/***/ "./server/controllers/nutrition.controller.js":
/*!****************************************************!*\
  !*** ./server/controllers/nutrition.controller.js ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _models_diary_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/diary.model */ \"./server/models/diary.model.js\");\n/* harmony import */ var _models_nutritionValue_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/nutritionValue.model */ \"./server/models/nutritionValue.model.js\");\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\nconst getNutritionByCategory = async (req, res) => {\n  const dateSelected = req.query.dateSelected;\n  /*\n  1. Find all food in diary\n  2. For each food, find the nutrient values\n  3. aggregate by nutrition values\n  */\n\n  const user = await _models_user_model__WEBPACK_IMPORTED_MODULE_2__.default.findOne({\n    gid: req.auth\n  }).exec();\n  const diary = await _models_diary_model__WEBPACK_IMPORTED_MODULE_0__.default.find({\n    $and: [{\n      user: user\n    }, {\n      added_on: dateSelected\n    }]\n  });\n  let allNutrients = [];\n\n  if (!!diary.length && !!diary[0].food.length) {\n    for (const f of diary[0].food) {\n      for (const n of f.nutrientValues) {\n        const nutrient = await _models_nutritionValue_model__WEBPACK_IMPORTED_MODULE_1__.NutritionValue.findById(n._id);\n        allNutrients.push(nutrient);\n      }\n    }\n  } else {\n    return res.status(200).json({\n      error: 'No nutrient report found.'\n    });\n  }\n\n  try {\n    /* sum of each nutrient */\n    const result = allNutrients.reduce((acc, cur) => {\n      acc[cur.nutrientName] = acc[cur.nutrientName] || 0;\n      acc[cur.nutrientName] += cur.value;\n      return acc;\n    }, Object.create(null));\n    return res.status(200).json(result); // result = { 'Salt': 1000, 'Sugars': 20, 'Saturated Fat': 10 } \n  } catch (err) {\n    console.log(err);\n  }\n};\n\nconst _default = {\n  getNutritionByCategory\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(getNutritionByCategory, \"getNutritionByCategory\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/nutrition.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/nutrition.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/controllers/nutrition.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\nconst getUserById = async (req, res, next, userId) => {\n  try {\n    const user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.findById(userId).exec();\n\n    if (!user) {\n      return res.status(401).json({\n        error: 'User not found.'\n      });\n    }\n\n    req.user = user;\n    next();\n  } catch (err) {\n    console.log(\"From getUserById\", err);\n  }\n};\n\nconst _default = {\n  getUserById\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(getUserById, \"getUserById\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/user.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/controllers/user.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/devBundle.js":
/*!*****************************!*\
  !*** ./server/devBundle.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./config/config.js\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _webpack_config_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../webpack.config.client */ \"./webpack.config.client.js\");\n/* harmony import */ var _webpack_config_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_webpack_config_client__WEBPACK_IMPORTED_MODULE_4__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\nconst compile = app => {\n  if (_config_config__WEBPACK_IMPORTED_MODULE_0__.default.env === 'development') {\n    const compiler = webpack__WEBPACK_IMPORTED_MODULE_1___default()((_webpack_config_client__WEBPACK_IMPORTED_MODULE_4___default()));\n    const middleware = webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default()(compiler, {\n      publicPath: (_webpack_config_client__WEBPACK_IMPORTED_MODULE_4___default().output.publicPath)\n    });\n    app.use(middleware);\n    app.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler));\n  }\n};\n\nconst _default = {\n  compile\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(compile, \"compile\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/devBundle.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/devBundle.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/devBundle.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _devBundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./devBundle */ \"./server/devBundle.js\");\n/* harmony import */ var _routes_diary_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/diary.routes */ \"./server/routes/diary.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n/* harmony import */ var _routes_nutrition_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/nutrition.routes */ \"./server/routes/nutrition.routes.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../template */ \"./template.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\n\n\nconst CURRENT_WORKING_DIR = process.cwd();\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n_devBundle__WEBPACK_IMPORTED_MODULE_4__.default.compile(app);\nconst corsOptions = {\n  credentials: true,\n  optionSuccessStatus: 200\n};\napp.use('/dist', express__WEBPACK_IMPORTED_MODULE_0___default().static(path__WEBPACK_IMPORTED_MODULE_1___default().join(CURRENT_WORKING_DIR, 'dist')));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()(corsOptions));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use('/auth', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_6__.default);\napp.use('/api/diary', _routes_diary_routes__WEBPACK_IMPORTED_MODULE_5__.default);\napp.use('/api/nutrient', _routes_nutrition_routes__WEBPACK_IMPORTED_MODULE_7__.default);\napp.get('*', (req, res, next) => {\n  res.set('Content-Type', 'text/html');\n  res.send((0,_template__WEBPACK_IMPORTED_MODULE_8__.default)());\n  next();\n});\nconst _default = app;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(CURRENT_WORKING_DIR, \"CURRENT_WORKING_DIR\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/express.js\");\n  reactHotLoader.register(app, \"app\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/express.js\");\n  reactHotLoader.register(corsOptions, \"corsOptions\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/express.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/express.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/express.js?");

/***/ }),

/***/ "./server/helpers/decodeHelper.js":
/*!****************************************!*\
  !*** ./server/helpers/decodeHelper.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.nmd, __webpack_require__, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 12:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst fetch = __webpack_require__(/*! node-fetch */ \"node-fetch\");\n\nmodule.exports = {\n  decodeJwt: function (token) {\n    const segments = token.split('.');\n    if (segments.length !== 3) throw new Error('Segments invalid'); // base64 segments\n\n    const headerSeg = segments[0];\n    const payloadSeg = segments[1];\n    const signSeg = segments[2]; //base64 decode and parse JSON\n\n    const header = JSON.parse(base64urlDecode(headerSeg));\n    const payload = JSON.parse(base64urlDecode(payloadSeg));\n    return {\n      header: header,\n      payload: payload,\n      signSeg: signSeg\n    };\n  }\n};\n\nfunction base64urlDecode(str) {\n  return Buffer.from(base64urlUnescape(str), 'base64');\n}\n\nfunction base64urlUnescape(str) {\n  str += Array(5 - str.length % 4).join('=');\n  return str.replace(/\\-/g, '+').replace(/_/g, '/');\n}\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(base64urlDecode, \"base64urlDecode\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/helpers/decodeHelper.js\");\n  reactHotLoader.register(base64urlUnescape, \"base64urlUnescape\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/helpers/decodeHelper.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/helpers/decodeHelper.js?");

/***/ }),

/***/ "./server/helpers/removeTime.js":
/*!**************************************!*\
  !*** ./server/helpers/removeTime.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ removeTime\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nfunction removeTime(date = new Date()) {\n  return new Date(date.getFullYear(), date.getMonth(), date.getDate());\n}\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(removeTime, \"removeTime\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/helpers/removeTime.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/helpers/removeTime.js?");

/***/ }),

/***/ "./server/models/diary.model.js":
/*!**************************************!*\
  !*** ./server/models/diary.model.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _food_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food.model */ \"./server/models/food.model.js\");\n/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var _helpers_removeTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/removeTime */ \"./server/helpers/removeTime.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\nconst DiarySchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  user: {\n    ref: _user_model__WEBPACK_IMPORTED_MODULE_2__.default,\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId\n  },\n  food: [_food_model__WEBPACK_IMPORTED_MODULE_1__.FoodSchema],\n  added_on: {\n    type: Date,\n    default: (0,_helpers_removeTime__WEBPACK_IMPORTED_MODULE_3__.default)(new Date())\n  }\n});\nconst Diary = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Diary', DiarySchema);\nconst _default = Diary;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(DiarySchema, \"DiarySchema\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/diary.model.js\");\n  reactHotLoader.register(Diary, \"Diary\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/diary.model.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/diary.model.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/models/diary.model.js?");

/***/ }),

/***/ "./server/models/food.model.js":
/*!*************************************!*\
  !*** ./server/models/food.model.js ***!
  \*************************************/
/*! namespace exports */
/*! export Food [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FoodSchema [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Food\": () => /* binding */ Food,\n/* harmony export */   \"FoodSchema\": () => /* binding */ FoodSchema\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _nutritionValue_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nutritionValue.model */ \"./server/models/nutritionValue.model.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nconst FoodSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  name: {\n    type: String // required: true,\n\n  },\n  description: {\n    type: String // required: true,\n\n  },\n  nutrientValues: [Object]\n});\nFoodSchema.virtual('nutrients', {\n  ref: 'NutritionValue',\n  localField: '_id',\n  foreignField: 'food'\n});\nconst Food = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Food', FoodSchema);\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(FoodSchema, \"FoodSchema\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/food.model.js\");\n  reactHotLoader.register(Food, \"Food\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/food.model.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/models/food.model.js?");

/***/ }),

/***/ "./server/models/nutritionValue.model.js":
/*!***********************************************!*\
  !*** ./server/models/nutritionValue.model.js ***!
  \***********************************************/
/*! namespace exports */
/*! export NutritionValue [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NutritionValueSchema [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NutritionValue\": () => /* binding */ NutritionValue,\n/* harmony export */   \"NutritionValueSchema\": () => /* binding */ NutritionValueSchema\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _food_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food.model */ \"./server/models/food.model.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nconst NutritionValueSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  nutrientId: {\n    type: Number,\n    required: true\n  },\n  nutrientName: {\n    type: String,\n    required: true\n  },\n  unitName: {\n    type: String,\n    required: true\n  },\n  value: {\n    type: Number,\n    required: true\n  },\n  food: {\n    ref: \"Food\",\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId\n  }\n});\nconst NutritionValue = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('NutritionValue', NutritionValueSchema);\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(NutritionValueSchema, \"NutritionValueSchema\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/nutritionValue.model.js\");\n  reactHotLoader.register(NutritionValue, \"NutritionValue\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/nutritionValue.model.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/models/nutritionValue.model.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  gid: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  name: {\n    type: String,\n    required: true\n  },\n  createdAt: {\n    type: String,\n    default: new Date(Date.now())\n  }\n});\nconst User = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', UserSchema);\nconst _default = User;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(UserSchema, \"UserSchema\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/user.model.js\");\n  reactHotLoader.register(User, \"User\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/user.model.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/models/user.model.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\nconst routes = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nroutes.post('/signin', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.default.postSignin);\nroutes.get('/signout', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.default.signout);\nconst _default = routes;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(routes, \"routes\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/routes/auth.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/routes/auth.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/diary.routes.js":
/*!***************************************!*\
  !*** ./server/routes/diary.routes.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_diary_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/diary.controller */ \"./server/controllers/diary.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\nconst routes = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nroutes.get('/:userId', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.isAuthenticated, _controllers_diary_controller__WEBPACK_IMPORTED_MODULE_1__.default.getDiary);\nroutes.post('/', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.isAuthenticated, _controllers_diary_controller__WEBPACK_IMPORTED_MODULE_1__.default.addFoodToDiary);\nroutes.delete('/:userId/:itemId', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.isAuthenticated, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.hasAuthorization, _controllers_diary_controller__WEBPACK_IMPORTED_MODULE_1__.default.deleteItem);\nroutes.param('userId', _controllers_user_controller__WEBPACK_IMPORTED_MODULE_3__.default.getUserById);\nconst _default = routes;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(routes, \"routes\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/routes/diary.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/routes/diary.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/routes/diary.routes.js?");

/***/ }),

/***/ "./server/routes/nutrition.routes.js":
/*!*******************************************!*\
  !*** ./server/routes/nutrition.routes.js ***!
  \*******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_nutrition_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/nutrition.controller */ \"./server/controllers/nutrition.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nconst routes = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nroutes.get('/by/category', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.isAuthenticated, _controllers_nutrition_controller__WEBPACK_IMPORTED_MODULE_1__.default.getNutritionByCategory);\nconst _default = routes;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(routes, \"routes\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/routes/nutrition.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/routes/nutrition.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/routes/nutrition.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/config */ \"./config/config.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_1__.default.mongoUri).then(() => {\n  'Database connected';\n}).catch(err => console.log(err));\n_express__WEBPACK_IMPORTED_MODULE_2__.default.listen(_config_config__WEBPACK_IMPORTED_MODULE_1__.default.port, err => {\n  if (err) console.log(err);\n  console.log(`Server started on port ${_config_config__WEBPACK_IMPORTED_MODULE_1__.default.port}`);\n});\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(db, \"db\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/server/server.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst _default = () => {\n  return `<doctype html>\n        <html lang=\"en\">\n            <head>\n                <meta charset=\"utf-8\">\n                <meta name=\"viewport\" content=\"initial-scale=1, width=device-width\" />\n                <title>Bad Nutrients Tracker</title>\n                <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:100,300,400,600\">\n                <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\n            </head>\n            <body>\n                <div id=\"root\"></div>\n                <script type=\"text/javascript\" src=\"/dist/bundle.js\" async defer></script>\n                <script src=\"https://accounts.google.com/gsi/client\" async defer></script>\n            </body>\n        </html>\n    `;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/template.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./template.js?");

/***/ }),

/***/ "./webpack.config.client.js":
/*!**********************************!*\
  !*** ./webpack.config.client.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.nmd, __webpack_require__, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 54:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\nconst CURRENT_WORKING_DIR = process.cwd();\nconst env = dotenv.config().parsed;\nconst envKeys = Object.keys(env).reduce((prev, next) => {\n  prev[`process.env.${next}`] = JSON.stringify(env[next]);\n  return prev;\n}, {});\nconst config = {\n  name: \"browser\",\n  mode: \"development\",\n  devtool: 'eval-source-map',\n  entry: ['webpack-hot-middleware/client?reload=true', path.join(CURRENT_WORKING_DIR, './client/src/index.js')],\n  output: {\n    path: path.join(CURRENT_WORKING_DIR, '/dist'),\n    filename: 'bundle.js',\n    publicPath: '/dist/'\n  },\n  module: {\n    rules: [{\n      test: /\\.jsx?$/,\n      exclude: /node_modules/,\n      use: ['babel-loader']\n    }, {\n      test: /\\.(ttf|eot|svg|gif|jpg|png)(\\?[\\s\\S]+)?$/,\n      use: 'file-loader'\n    }, {\n      test: /\\.css$/i,\n      use: [\"style-loader\", \"css-loader\"]\n    }]\n  },\n  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new webpack.DefinePlugin(envKeys), new webpack.EnvironmentPlugin(['NODE_ENV', 'REACT_APP_USDA_CLIENT_KEY', 'REACT_APP_GOOGLE_CLIENT_SECRET'])],\n  resolve: {\n    alias: {\n      'react-dom': '@hot-loader/react-dom',\n      process: \"process/browser\"\n    },\n    modules: ['node_modules']\n  }\n};\nmodule.exports = config;\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(CURRENT_WORKING_DIR, \"CURRENT_WORKING_DIR\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/webpack.config.client.js\");\n  reactHotLoader.register(env, \"env\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/webpack.config.client.js\");\n  reactHotLoader.register(envKeys, \"envKeys\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/webpack.config.client.js\");\n  reactHotLoader.register(config, \"config\", \"/Users/vynguyen07/Desktop/Computer_Science/S6/final-project/project/webpack.config.client.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://final-project/./webpack.config.client.js?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"cookie-parser\");;\n\n//# sourceURL=webpack://final-project/external_%22cookie-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"cors\");;\n\n//# sourceURL=webpack://final-project/external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"dotenv\");;\n\n//# sourceURL=webpack://final-project/external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack://final-project/external_%22express%22?");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express-jwt\");;\n\n//# sourceURL=webpack://final-project/external_%22express-jwt%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"jsonwebtoken\");;\n\n//# sourceURL=webpack://final-project/external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"mongoose\");;\n\n//# sourceURL=webpack://final-project/external_%22mongoose%22?");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"node-fetch\");;\n\n//# sourceURL=webpack://final-project/external_%22node-fetch%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"path\");;\n\n//# sourceURL=webpack://final-project/external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack\");;\n\n//# sourceURL=webpack://final-project/external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack-dev-middleware\");;\n\n//# sourceURL=webpack://final-project/external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack-hot-middleware\");;\n\n//# sourceURL=webpack://final-project/external_%22webpack-hot-middleware%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./server/server.js");
/******/ })()
;