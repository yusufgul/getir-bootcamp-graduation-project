const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const dataChecker = require("./../utils/dataChecker");

/**
 * @swagger
 * components:
 *   schemas:
 *     Request Payload:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *         - minCount
 *         - maxCount
 *       properties:
 *         startDate:
 *           type: string
 *           description: The date the filtering will start
 *         endDate:
 *           type: string
 *           description: The date the filtering will end
 *         minCount:
 *           type: number
 *           description: The number the filtering will start
 *         maxCount:
 *           type: number
 *           description: The number the filtering will end
 *       example:
 *         {
 *          "startDate": "2016-01-26",
 *          "endDate": "2018-02-02",
 *          "minCount": 2700,
 *          "maxCount": 3000
 *         }
 *     Response Payload:
 *       type: object
 *       required:
 *         - code
 *         - msg
 *         - records
 *       properties:
 *         code:
 *           type: number
 *           description: 0 indicates that process is successful, 1 indicates unsuccessful.
 *         msg:
 *           type: string
 *           description: The description of the result of the process
 *         records:
 *           type: array
 *           description: The result of filtering
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               totalCount:
 *                 type: number
 *       example:
 *         {
 *            "code":0,
 *            "msg":"Success",
 *            "records":[
 *              {
 *                 "key":"TAKwGc6Jr4i8Z487",
 *                 "createdAt":"2017-01-28T01:22:14.398Z",
 *                 "totalCount":2800
 *              },
 *              {
 *                 "key":"NAeQ8eX7e5TEg7oH",
 *                 "createdAt":"2017-01-27T08:19:14.135Z",
 *                 "totalCount":2900
 *               }
 *             ]
 *          }
 *     Error:
 *       type: object
 *       required:
 *         - code
 *         - msg
 *         - records
 *       properties:
 *         code:
 *           type: number
 *           description: 0 indicates that process is successful, 1 indicates unsuccessful.
 *         msg:
 *           type: string
 *           description: The description of the result of the process
 *         records:
 *           type: array
 *           description: The result of filtering
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               totalCount:
 *                 type: number
 *       example:
 *         {
 *            "code":1,
 *            "msg":"Error description.",
 *            "records":[]
 *          }
 *
 */

/**
 * @swagger
 * tags:
 *   name: Actions
 *   description: Operations that you can perform on given MongoDB collection
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Fetch the data return in requested format
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request Payload'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response Payload'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post("/", dataChecker, apiController.getData);

module.exports = router;
