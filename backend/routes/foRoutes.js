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
router.get('/backend-keep-alive', async (req, res) => {
    try {
        const [events, users] = await Promise.all([
            db.getAllEvents(),
            userDAO.getAllUsers()
        ]);

        console.log("Keep-alive ping:", { eventCount: events.length, userCount: users.length });

        const safeUsers = users.map(u => ({
            username: u.username,
            familyId: u.familyId,
            role: u.role,
            createdAt: u.createdAt,
        }));

        res.status(200).json({
            alive: true,
            events,
            users: safeUsers
        });
    } catch (error) {
        console.error("Keep-alive error:", error);
        res.status(500).json({ alive: false, error: error.toString() });
    }
});

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