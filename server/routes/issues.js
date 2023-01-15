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

// @desc    Show user issues
// @route   GET /issues/user/:userId
router.get('/user/:userId', ensureAuth, async (req,res) => {
    try {
        const issues = await Issue.find({ user: req.params.userId, $or: [{ status: "Not Started" }, { status: "In Progress" }] })
            .populate('user')
            .lean()

        res.render('issues/index', {
            issues
        })
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

// @desc    Show single issue
// @route   GET /issues/:id
router.get('/:id', ensureAuth, async (req,res) => {
    try {
        let issue = await Issue.findById(req.params.id)
            .populate('user')
            .lean()
        
        if(!issue) {
            return res.render('error/404')
        }

        res.render('issues/show', {
            issue
        })
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

// @desc    Show issue edit page
// @route   GET /issues/edit/:id
router.get('/edit/:id', ensureAuth, async (req,res) => {
    try {
        const issue = await Issue.findOne({
            _id: req.params.id,
        }).lean()
    
        if (!issue) {
            return res.render('error/404')
        }
    
        if(issue.user != req.user.id) {
            res.redirect('/issues')
        } else {
            res.render('issues/edit', {
                issue,
            })
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500')
    }
})

// @desc    Update issue
// @route   PUT /issues/:id
router.put('/:id', ensureAuth, async (req,res) => {
    try {
        let issue = await Issue.findById(req.params.id).lean()
    
        if(!issue) {
            return res.render('error/404')
        }
    
        if(issue.user != req.user.id) {
            res.redirect('/issues')
        } else {
            issue = await Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
    
            res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500')
    }
})

// @desc    Delete issue
// @route   DELETE /issues/:id
router.delete('/:id', ensureAuth, async (req,res) => {
    try {
        await Issue.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err);
        return res.render('error/500')
    }
})

module.exports = router