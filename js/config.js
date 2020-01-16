var kedixa_kazelink_config = {
    "win": { // unique key
        "label": "胜利", // word to show
        "type": "number", // number or text
        "default_value": 0, // default value
        "buttons": [
            {
                "name": "win_add", // unique name
                "label": "+1", // word to show on button
                "action": 1 // add this value to counter
            },
            {
                "name": "win_sub",
                "label": "-1",
                "action": -1
            }
        ]
    },
    "kind": {
        "label": "积德",
        "type": "number",
        "default_value": 0,
        "buttons": [
            {
                "name": "kind_add",
                "label": "+1",
                "action": 1,
                // when this button is clicked, the affected
                // button are also clicked
                "affect": ["win_add"]
            },
            {
                "name": "kind_sub",
                "label": "-1",
                "action": -1,
                "affect": ["win_sub"]
            }
        ]
    },
    "lose": {
        "label": "失败",
        "type": "number",
        "default_value": 0,
        "buttons": [
            {
                "name": "lose_add",
                "label": "+1",
                "action": 1
            },
            {
                "name": "lose_sub",
                "label": "-1",
                "action": -1
            }
        ]
    },
    "soup": {
        "label": "喝汤",
        "type": "number",
        "default_value": 0,
        "buttons": [
            {
                "name": "soup_add",
                "label": "+1",
                "action": 1,
                "affect": ["lose_add"]
            },
            {
                "name": "soup_sub",
                "label": "-1",
                "action": -1,
                "affect": ["lose_sub"]
            }
        ]
    },
    "drop": {
        "label": "掉线",
        "type": "number",
        "default_value": 0,
        "buttons": [
            {
                "name": "drop_add",
                "label": "+1",
                "action": 1
            },
            {
                "name": "drop_sub",
                "label": "-1",
                "action": -1
            }
        ]
    },
    "draw": {
        "label": "平局",
        "type": "number",
        "default_value": 0,
        "buttons": [
            {
                "name": "draw_add",
                "label": "+1",
                "action": 1
            },
            {
                "name": "draw_sub",
                "label": "-1",
                "action": -1
            }
        ]
    },
    "comment": {
        "label": "点评",
        "type": "text",
        "default_value": "666666"
    },
    "template": {
        "type": "template",
        "default_value": "胜{win}败{lose}平{draw}积德{kind}喝汤{soup}掉线{drop}点评:{comment}"
    }
};
