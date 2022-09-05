const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

router.get('/me', auth, async function(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'avatar']);

        if (!profile) {
            return res.status(400).json({ message: 'There is no profile' });
        }

        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error: ' + err.message);
    }
})

router.post('/', [auth, [
        check('status', "Status is required").not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills){
            profileFields.skills = skills.split(',').map(skills => skills.trim());
            console.log(profileFields.skills);
        }
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(facebook) profileFields.social.facebook = facebook;
        if(twitter) profileFields.social.twitter = twitter;
        if(instagram) profileFields.social.instagram = instagram;
        if(linkedin) profileFields.social.linkedin = linkedin;

        try{
            let profile = await Profile.findOne({user:req.user.id});
            if(profile){
                profile = await Profile.findOneAndUpdate({user:req.user.id},{$set: profileFields},{new:true});
                return res.json(profile);
            }

            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);

        } catch(err){
            console.log(err.message);
            res.status(500).send('Server Error');
        }
});

router.get('/',async (req, res) => {
    try{
        let profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/user/:user_id',async (req, res) => {
    try{
        let profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).send('Profile not found');
        }
        res.json(profile);
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/',auth , async (req, res) => {
    try{
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        return res.json({"message":"profile deleted"});
    }catch(err){
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
})

router.put('/experience',[auth, [
    check("title",'Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From is required').not().isEmpty()
]
], async function (req, res){
    console.log(req);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {title,company,location,from,to,current,description} = req.body;

    const NewExperience = {
        title,company,location,from,to,current,description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(NewExperience);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }

});

router.delete('/experience/:exp_id',auth, async function(req, res) {
    try {
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        await profile.save(); 
        res.send('Success');
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }
});

router.put('/education',[auth, [
    check("school",'School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is required').not().isEmpty()
]
], async function (req, res){
    console.log(req);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {school,degree,fieldofstudy} = req.body;

    const NewEducation = {
        school,degree,fieldofstudy
    }

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(NewEducation);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }

});

router.delete('/education/:edu_id',auth, async function(req, res) {
    try {
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        await profile.save(); 
        res.send('Success');
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }
});


module.exports = router;