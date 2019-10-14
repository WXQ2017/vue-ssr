const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'


const app = express()