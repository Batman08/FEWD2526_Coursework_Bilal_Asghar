const express = require('express');
const controller = require('../controllers/foController');
const router = express.Router();
const passport = require("passport");



router.post("/register", controller.process_new_user);
router.post("/login", controller.handle_login)
router.get('/all-events', passport.authenticate('jwt', { session: false }), controller.json_events_endpoint);
router.get('/all-users', passport.authenticate('jwt', { session: false }), controller.json_users_endpoint);
router.post('/get-family-events', passport.authenticate('jwt', { session: false }), controller.family_events_endpoint);
router.post('/new-event-entry', passport.authenticate('jwt', { session: false }), controller.post_new_event);
router.get('/event/:id', passport.authenticate('jwt', { session: false }), controller.show_edit_event);
router.post('/update-event/:id', passport.authenticate('jwt', { session: false }), controller.update_event);
router.post('/delete-event/:id', passport.authenticate('jwt', { session: false }), controller.delete_event);

//for hosted backend (Render) keep-alive ping
router.get("/backend-keep-alive", controller.keep_alive);

router.use((req, res) => {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found');
});

// router.use((err, req, res, next) => {
//     res.status(500);
//     res.type('text/plain');
//     res.send("Internal Server Error.");
// })


module.exports = router;