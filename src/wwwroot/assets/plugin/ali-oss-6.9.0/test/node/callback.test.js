// TODO callback server is disable
// const fs = require('fs');
// const assert = require('assert');
// const utils = require('./utils');
// const oss = require('../..');
// const config = require('../config').oss;
// const { callbackServer } = require('../const');
// const mm = require('mm');
//
// describe('test/callback.test.js', () => {
//   const { prefix } = utils;
//   let store;
//   let bucket;
//   let bucketRegion;
//
//   before(async () => {
//     store = oss(config);
//     bucket = `ali-oss-test-callback-bucket-${prefix.replace(/[/.]/g, '-')}`;
//     bucket = bucket.substring(0, bucket.length - 1);
//     bucketRegion = config.region;
//
//     await store.putBucket(bucket, bucketRegion);
//     store.useBucket(bucket, bucketRegion);
//   });
//
//   after(async () => {
//     await utils.cleanBucket(store, bucket, bucketRegion);
//   });
//
//
//   describe('upload callback', () => {
//     afterEach(mm.restore);
//     // callback server on EC2, maybe fail on China, bug pass on travis ci
//     // callback server down, skip it
//     it('should multipart upload parse response with callback', async () => {
//       // create a file with 1M random data
//       const fileName = await utils.createTempFile('upload-with-callback', 1024 * 1024);
//
//       const name = `${prefix}multipart/upload-with-callback`;
//       const result = await store.multipartUpload(name, fileName, {
//         partSize: 100 * 1024,
//         callback: {
//           url: callbackServer,
//           host: 'oss-cn-hangzhou.aliyuncs.com',
//           /* eslint no-template-curly-in-string: [0] */
//           body: 'bucket=${bucket}&object=${object}&var1=${x:var1}',
//           contentType: 'application/x-www-form-urlencoded',
//           customValue: {
//             var1: 'value1',
//             var2: 'value2'
//           }
//         }
//       });
//       assert.equal(result.res.status, 200);
//       assert.equal(result.data.Status, 'OK');
//     });
//
//     it('should multipart upload copy with callback', async () => {
//       const fileName = await utils.createTempFile('multipart-upload-file-copy-callback', 2 * 1024 * 1024);
//       const name = `${prefix}multipart/upload-file-with-copy-callback`;
//       await store.multipartUpload(name, fileName);
//
//       const client = store;
//       const copyName = `${prefix}multipart/upload-file-with-copy-new-callback`;
//       const result = await client.multipartUploadCopy(copyName, {
//         sourceKey: name,
//         sourceBucketName: bucket
//       }, {
//         partSize: 256 * 1024,
//         callback: {
//           url: callbackServer,
//           host: 'oss-cn-hangzhou.aliyuncs.com',
//           body: 'bucket=${bucket}&object=${object}&var1=${x:var1}',
//           contentType: 'application/x-www-form-urlencoded',
//           customValue: {
//             var1: 'value1',
//             var2: 'value2'
//           }
//         },
//         copyheaders: {
//           'x-oss-copy-source-if-match': ''
//         }
//       });
//
//       assert.equal(result.res.status, 200);
//       assert.equal(result.data.Status, 'OK');
//     });
//
//     it('should multipart upload with no more 100k file parse response with callback', async () => {
//       // create a file with 1M random data
//       const fileName = await utils.createTempFile('upload-with-callback', 50 * 1024);
//
//       const name = `${prefix}multipart/upload-with-callback`;
//       const result = await store.multipartUpload(name, fileName, {
//         partSize: 100 * 1024,
//         callback: {
//           url: callbackServer,
//           host: 'oss-cn-hangzhou.aliyuncs.com',
//           body: 'bucket=${bucket}&object=${object}&var1=${x:var1}',
//           contentType: 'application/x-www-form-urlencoded',
//           customValue: {
//             var1: 'value1',
//             var2: 'value2'
//           }
//         }
//       });
//       assert.equal(result.res.status, 200);
//       assert.equal(result.data.Status, 'OK');
//     });
//
//     it('should putStream parse response with callback', async () => {
//       const name = `${prefix}ali-sdk/oss/putstream-callback.js`;
//       const result = await store.putStream(name, fs.createReadStream(__filename), {
//         callback: {
//           url: callbackServer,
//           host: 'oss-cn-hangzhou.aliyuncs.com',
//           body: 'bucket=${bucket}&object=${object}&var1=${x:var1}',
//           contentType: 'application/x-www-form-urlencoded',
//           customValue: {
//             var1: 'value1',
//             var2: 'value2'
//           }
//         }
//       });
//
//       assert.equal(result.res.status, 200);
//       assert.equal(result.data.Status, 'OK');
//     });
//
//     it('should put parse response with callback', async () => {
//       const name = `${prefix}ali-sdk/oss/put-callback.js`;
//       const result = await store.put(name, __filename, {
//         callback: {
//           url: callbackServer,
//           host: 'oss-cn-hangzhou.aliyuncs.com',
//           body: 'bucket=${bucket}&object=${object}&var1=${x:var1}',
//           contentType: 'application/x-www-form-urlencoded',
//           customValue: {
//             var1: 'value1',
//             var2: 'value2'
//           }
//         }
//       });
//
//       assert.equal(result.res.status, 200);
//       assert.equal(result.data.Status, 'OK');
//     });
//
//     it('should multipart upload with no more 100k file use header x-oss-callback', async () => {
//       // create a file with 1M random data
//       const fileName = await utils.createTempFile('upload-with-callback', 50 * 1024);
//       const callback = {
//         url: callbackServer,
//         body: 'bucket=${bucket}&object=${object}&var1=${x:var1}'
//       };
//       const name = `${prefix}multipart/upload-with-callback`;
//       /* eslint no-mixed-spaces-and-tabs: [0] */
//       const result = await store.multipartUpload(name, fileName, {
//         partSize: 100 * 1024,
//         headers: {
//           'x-oss-callback': utils.encodeCallback(callback)
//         }
//       });
//       assert.equal(result.res.status, 200);
//       assert.equal(result.data.Status, 'OK');
//     });
//   });
// });
