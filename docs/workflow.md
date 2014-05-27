/**
 * Workflow
 */


//////////////
// New zzz  //
//////////////


/**
 * Create a zzz
 * POST
 */

//Req
```
{
  zzz: {} //A new zzz, empty
}
```

//Res
```
{
    "ZZZResp": {
        "admin": "15c36788",
        "url": "d037d09446d6f7fce3f9aece",
        "t": 1401182052465
    }
}
```

/**
 * Get the new zzz
 * GET
 */

//Req
//{{server}}/zzz?t=140118145&url=d037d09446d6f7fce3f9aece

//Res
```
{
    "ZZZResp": {
        "zzz": "{}", //The zzz created
        "uzzzers": [], //no users, ok
        "t": 1401182080256
    }
}
```

/**
 * Get Admin
 * GET, with url admin
 */

//Req
//{{server}}/zzz?t=140118145&url=d037d09446d6f7fce3f9aece15c36788

//Res
//200 nothing (?)


/**
 * Edit a zzz as admin
 * POST
 */

//Req
```
{
  admin:"15c36788",
  url:"d037d09446d6f7fce3f9aece",
  zzz:{
    title: "Un super zzz de test",
    message: "Yo !"
  }
}
```

//Res
```
{"ZZZResp":{"t":1401182339955}}// just a timestamp, it's ok
```




/**
 * Get
 * GET
 */

//Res
``` 
{
    "ZZZResp": {
        "zzz": "{\"title\":\"Un super zzz de test\",\"message\":\"Yo !\"}",
        "uzzzers": [],
        "t": 1401182378619
    }
}
```


////////////////////////////
// A new user is comming  //
////////////////////////////



/**
 * Load and join
 * POST
 */

//Req
```
{
  url:"d037d09446d6f7fce3f9aece", // the zzz url
  me : { // some user info, @see docs
    nick: "user1",
    mood: "message 1",
    status: 1
  }
}
```

//Res
```
{
    "ZZZResp": {
        "id": "384a1e034236c24e470635732a85216d",
        "key": "786d9f8b5fc7f99ddbd0fdcca76b4c40",
        "zzz": "{\"title\":\"Un super zzz de test\",\"message\":\"Yo !\"}",
        "uzzzers": [], //Bug ? : the new user is not return
        "t": 1401182459075
    }
}
```

/**
 * Get
 * GET
 */

//Res
```
{
    "ZZZResp": {
        "zzz": "{\"title\":\"Un super zzz de test\",\"message\":\"Yo !\"}",
        "uzzzers": [
            {
                "data": {
                    "nick": "user1",
                    "mood": "yo",
                    "status": 1,
                    "refresh": 1401182459097
                },
                "id": "384a1e034236c24e470635732a85216d"
            }
        ],
        "t": 1401182509041
    }
}
```


/**
 * Edit user as admin
 *
 * Impossible. No 'users' field in request
 */


/**
 * Refresh
 * = edit user info from user
 * POST
 */

//Req
```
{
  id:"384a1e034236c24e470635732a85216d",
  key:"786d9f8b5fc7f99ddbd0fdcca76b4c40",
  urls: ['d037d09446d6f7fce3f9aece'], //At least one url,
  //no key "url", @see load and join for that
  me : {
    nick: "user1",
    mood: "message 2",
    status: 2
  }
}
```

//Res
```
{
    "ZZZResp": {
        "t": 1401183075594 // just a timestamp, it's ok
    }
}
```

/**
 * Get
 * GET
 */

//Res
```
{
    "ZZZResp": {
        "zzz": "{\"title\":\"Un super zzz de test\",\"message\":\"Yo !\"}",
        "uzzzers": [
            {
                "data": {
                    "nick": "user1",
                    "mood": "message 2",
                    "status": 1,
                    "refresh": 1401182459097
                },
                "id": "384a1e034236c24e470635732a85216d"
            }
        ],
        "t": 1401182509041
    }
}
```


////////////////////////
// The user goes away //
////////////////////////


/**
 * Refresh
 * = edit user info from user
 * POST
 */

//Req
```
{
  id:"384a1e034236c24e470635732a85216d",
  key:"786d9f8b5fc7f99ddbd0fdcca76b4c40",
  urls: [], //empty = deconnect from all zzz
  //no key "url", @see load and join for that
  me : {
    nick: "user1",
    mood: "message 2",
    status: 2
  }
}
```


/**
 * Get
 * GET
 */

//Res
```
{
    "ZZZResp": {
        "zzz": "{\"title\":\"Un super zzz de test\",\"message\":\"Yo !\"}",
        "uzzzers": [],
        "t": 1401182509041
    }
}
```


