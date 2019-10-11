/**
 * created by: jeanluc mutomb
 * represent the Controller 
 * coordinates the request from the view by directing them to appropriate backend routes
 */

import axios from 'axios';
/**
 * handles the registration of an organisation
 */
export const register = newUser => {
    console.log(newUser);
    return axios.post('organisation/register', {
        username: newUser.username,
        password: newUser.password,
        name: newUser.name,
        description: newUser.description,
        where: newUser.where,
        latitude: newUser.latitude,
        longitude: newUser.longitude,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
        socialissues: newUser.socialissues,
    })
        .then(res => {
            if (res.data.success) {
                alert('You have successfully registered!')
                return true;
            }
            else {
                return false;
            }
        })
        .catch(err => {
            alert('error occured while registering')
            return false;
        })

}

/**
 * handle the siging in of organisation
 */
export const login = user => {
    return (
        axios.post('organisation/login', {
            password: user.password,
            email: user.email,
        })
            .then(res => {
                if (!res.data.error) {
                    localStorage.setItem('usertoken', res.data)
                    return true;
                }
                else {
                    return false;
                }
            })
            .catch(err => {
                console.log("Error: " + err)
            })
    )
}
/**
 * handles the retrieval of a batch of events that were uploaded by given organisation
 */

export const getEvents = email => {
    return (
        axios.post('eventDetails/', {
            owner: email
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log('Error: anme ' + err)
            })
    )

}
/**
 * handles uploading of one event to database
 */
export const addEvent = event => {
    return (
        axios.post('eventDetails/add', {
            owner: event.owner,
            title: event.title,
            when: event.when,
            where: event.where,
            what: event.what
        })
            .then(res => {
                return res;
            })
            .catch(err => {
                return err;
            })
    )
}
/**
 * handles the retrieval of a batch of Posts that were uploaded by given organisation
 */
export const getPosts = email => {
    return (
        axios.post('postDetails/', {
            owner: email
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log('Error: anme ' + err)
            })
    )

}
/**
 * handles uploading of one post to database
 */

export const addPost = post => {
    return (
        axios.post('postDetails/add', {
            owner: post.owner,
            title: post.title,
            what: post.what,
            name: post.name
        })
            .then(res => {
                console.log(`${post.title} post uploaded`);
                return res;
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    )
}
/**
 * handles upload of modification to organisation details to database
 */
export const updateOrganisation = organisation => {

    return axios.post('organisation/update', {
        username: organisation.username,
        password: organisation.password,
        name: organisation.name,
        description: organisation.description,
        where: organisation.where,
        latitude: organisation.latitude,
        longitutde: organisation.longitutde,
        email: organisation.email,
        phonenumber: organisation.phonenumber
    })
        .then(data => {
            if (data.data.success) {
                return true
            }
            else {
                return false
            }
        })
        .catch(err => {
            return false
        })
}
/**
 * handles the uploading of profile picture to the database
 */
export const uploadProfilePicture = (imageFormObj) => {
    return axios.post(`http://localhost:5000/image/uploadmulter`, imageFormObj)
        .then((data) => {
            if (data.data.success) {
                return data.data;
            }
            else {
                return false;
            }
        })
        .catch((err) => {
            alert("Error while uploading image using multer" + err);
        });
}
/**
 * handles the retrieval of profile picture from the database
 */
export const getProfilePicture = (email) => {
    return axios.post(`http://localhost:5000/image/${email}`)
        .then((data) => {
            return data.data;
        })
        .catch((err) => {
            alert("Upload profile picture" + err);
        });
}
/**
 * handles deletion of profile picture from the database
 */
export const deleteProfilePicture = (email) => {
    return axios.delete(`http://localhost:5000/image/delete/${email}`)
        .then((data) => {
            return data.data;
        })
        .catch((err) => {
            alert("error occured while deleting picture:" + err);
        });
}
/**
 * handles the uploading of event picture to database
 */
export const uploadEventPicture = (imageFormObj) => {
    return axios.post(`http://localhost:5000/eventimage/add`, imageFormObj)
        .then((data) => {
            if (data.data.success) {
                return data.data;
            }
            else {
                return false;
            }
        })
        .catch((err) => {
            alert("Error while uploading image using multer" + err);
        });
}
/**
 * handles the uploading of post picture to database
 */
export const uploadPostPicture = (imageFormObj) => {
    return axios.post(`http://localhost:5000/postimage/add`, imageFormObj)
        .then((data) => {
            if (data.data.success) {
                return data.data;
            }
            else {
                return false;
            }
        })
        .catch((err) => {
            alert("Error while uploading image using multer" + err);
        });
}
/**
 * handles the retrieval of many organisations that match searched critiria
 */

export const getOrganisations = (keyword) => {
    return axios.post('http://localhost:5000/organisation/', {
        keyword: keyword
    })
        .then(data => {
            return data.data
        })
        .catch(err => alert(err))
}
/**
* handles the retrieval of many Posts that match searched critiria
*/
export const getSearchedPosts = (keyword) => {
    return (
        axios.post('postDetails/tags', {
            keyword: keyword
        })
            .then(data => {
                return data.data
            })
            .catch(err => alert(err))
    )

}
/**
 * handles the retrieval of many Events that match searched critiria
 */
export const getSearchedEvents = (keyword) => {
    return (
        axios.post('eventDetails/tags', {
            keyword: keyword
        })
            .then(data => {
                return data.data
            })
            .catch(err => alert(err))
    )

}
/**
 * handles the retrieval of public details of one organisation
 */
export const getOrganisation = (email) => {
    return (
        axios.get(`organisation/${email}`)
            .then(data => {
                return data.data
            })
            .catch(err => alert(err))
    )

}