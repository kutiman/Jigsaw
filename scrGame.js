#pragma strict

static var currentLevel : int = 0;

function Start () {
	DontDestroyOnLoad (transform.gameObject);
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Q) || Input.GetKeyDown(KeyCode.Escape)) {
		Application.Quit();
	}
}

static function CreatePieces () {

	var oldPieces : Array = new Array();
	oldPieces = GameObject.FindGameObjectsWithTag("tagPiece");
	for (var itemP : GameObject in oldPieces) {Destroy(itemP);}
	
	var oldBacks : Array = new Array();
	oldBacks = GameObject.FindGameObjectsWithTag("tagBack");
	for (var itemB : GameObject in oldBacks) {Destroy(itemB);}
	
	for (var i = 0; i < 6; i++) {
		for (var n = 0; n < 4; n++) {
			var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/objPiece"));
			obj.GetComponent(scrPiece).gridPos = Vector2(i,n);
			obj.GetComponent(scrPiece).correctPos = Vector2(-4.0 + i * 1.6, 2.4 - n * 1.6);
		}
	}
}

function GetGridPositions () {
	var posArr : Vector2;
}

static function OpenLevel (levelNumber : int) {
	//if (Application.loadedLevel != Application.levelCount - 1) {Application.LoadLevel(Application.levelCount - 1);}
	currentLevel = levelNumber;
	CreatePieces();
}
