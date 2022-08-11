const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// bring in Issue model
const Issue = require('../models/Issue')

// @desc    Show add page
// @route   GET /issues/add
router.get('/add', ensureAuth, (req,res) => {
    res.render('issues/add')
})

// @desc    Process add form
// @route   POST /issues
router.post('/', ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        await Issue.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

// @desc    Show all issues
// @route   GET /issues
router.get('/', ensureAuth, async (req,res) => {
    try {
        const issues = await Issue.find({ $or: [{ status: "Not Started" }, { status: "In Progress" }] })
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()

        res.render('issues/index', {
            issues,
        })
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

module.exports = router