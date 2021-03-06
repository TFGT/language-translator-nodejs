/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// security.js
var secure = require('express-secure-only');
var rateLimit = require('express-rate-limit');
var helmet = require('helmet');

module.exports = function(app) {

  // 1. redirects http to https
  app.enable('trust proxy'); // required when running on bluemix or similar to know if users originally came in on HTTPS and avoid endless redirects
  app.use(secure());
  app.use(helmet({
    frameguard: false
  }));

  // 3. rate limiting
  var translateLimiter = rateLimit({
    windowMs: 60 * 1000,
    delayMs: 1,
    max: 10
  });
  app.use('/api/translate', translateLimiter);

  var identifyLimiter = rateLimit({
    windowMs: 60 * 1000,
    delayMs: 1,
    max: 10
  });
  app.use('/api/identify', identifyLimiter);

};
