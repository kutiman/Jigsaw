#pragma strict

static var currentLevel : int = 0;

function Start () {
	DontDestroyOnLoad (transform.gameObject);
	CreateLevelButtons();
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Q) || Input.GetKeyDown(KeyCode.Escape)) {
		Application.Quit();
	}
	CheckForWinning ();
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
			var randPosX = Random.Range(3.4,3.6) * (1.0 - ((i * 6.0 + n) % 2.0) * 2.0);
			var randPosY = Random.Range(-3.2,3.2);
			obj.transform.position = Vector3(randPosX,randPosY,-1);
			obj.GetComponent(scrPiece).gridPos = Vector2(i,n);
			obj.GetComponent(scrPiece).correctPos = Vector2(-4.0 + i * 1.6, 2.4 - n * 1.6);
		}
	}
}

function GetGridPositions () {
	var posArr : Vector2;
}

static function OpenLevel (levelNumber : int) {
	currentLevel = levelNumber;
	CreatePieces();
	CreateGrid();
}

static function CreateGrid () {
	var grid : GameObject = GameObject.FindGameObjectWithTag("tagGrid");
	if (!grid) {
		GameObject.Instantiate(Resources.Load("Prefabs/objGrid"));
	}
	var plane : GameObject = GameObject.FindGameObjectWithTag("tagPlane");
	if (!plane) {
		GameObject.Instantiate(Resources.Load("Prefabs/Plane"));
	}
}

static function CheckForWinning () {
	var levelWon = false;
	var allPiecesList = GameObject.FindGameObjectsWithTag("tagPiece");
	var totalConnectedPieces : int = 0;
	for (var i : GameObject in allPiecesList) {
		if (i.GetComponent(scrPiece).connected) {totalConnectedPieces++;}
	}
	if (totalConnectedPieces > 0 && totalConnectedPieces == allPiecesList.Length) {
		levelWon = true;
	}
	return levelWon;
}

function CreateLevelButtons () {
	var levelAmount = 9;
	for (var i = 0; i < levelAmount; i++) {
		var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/btnLevel"));
		obj.transform.position = Vector2(-4.6 + 3 * (i % 4), 2.4 - 2.4 * Mathf.Floor(i/4));
		obj.GetComponent(scrBtnLevel).level = i + 1;
		
	}
}







