#pragma strict

public var gridPos : Vector2;
private var spriteArr : Array = new Array();
public var connected = false;
public var correctPos : Vector2;

private var zPos : float;

var screenPoint : Vector3;
var offset : Vector3;

function Start () {
	gameObject.name = gridPos.ToString();
	
	SetPosition();
	SetImage ();
	CreateBackPiece();
}

function Update () {

}

function SetImage () {
	var str = "Sprites/image_" + scrGame.currentLevel.ToString() ; //+ "_" + gridPos.x.ToString() + gridPos.y.ToString();
	spriteArr = Resources.LoadAll(str);
	
	GetComponent(SpriteRenderer).sprite = spriteArr[gridPos.x + gridPos.y * 6 + 1];
}

function OnMouseDown() {
	if (!connected) {
		transform.position.z = zPos - 1;
		
		screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);
		offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
	
	}
}

function OnMouseDrag() {
	if (!connected) {
		transform.position = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
		connected = CheckIfInCorrectPlace();
	}
	if (connected) {
		transform.position.z = zPos + 0.5;
		transform.position.x = correctPos.x;
		transform.position.y = correctPos.y;
		ParticleBurst();
	}
}

function OnMouseUp () {

	if (!connected) {
		transform.position.z = zPos;
		
	}
	if (connected) {
		transform.position.z = zPos + 0.5;
		transform.position.x = correctPos.x;
		transform.position.y = correctPos.y;
		ParticleBurst();
	}
	//CheckForMatch();
}

function CheckIfInCorrectPlace () {
	var bool = false;
	var myPos : Vector2 = transform.position;
	var magnetDist : float = 0.5;
	var distFromPos = Vector2.Distance(correctPos, myPos);
	if (distFromPos < magnetDist) {
		Debug.Log("I'm here");
		bool = true;
	}
	return bool;
}

function CreateBackPiece () {
	var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/objBackPiece"));
	obj.GetComponent(SpriteRenderer).sprite = GetComponent(SpriteRenderer).sprite;
	obj.transform.position.x = correctPos.x;
	obj.transform.position.y = correctPos.y;
}

function SetPosition () {
	var posX : float;
	var side : int = (gridPos.y * 4 + gridPos.x) % 2;
	//if (side == 0) {posX = Random.Range(-6.4,-5.6);}
	//else {posX = Random.Range(6.4,5.6);}
	// debugging
	if (side == 0) {posX = Random.Range(0,0);}
	else {posX = Random.Range(0,0);}
	// end
	var randPos = Vector3(posX, Random.Range/*(-4.0,4.0)*/(0,0), -1);
	transform.position = randPos;
	zPos = transform.position.z;
}

function ParticleBurst () {
	GetComponent(ParticleSystem).Play();
	yield WaitForSeconds(0.5);
	GetComponent(ParticleSystem).Stop();
}

/*

public var connector : GameObject;

function CreateConnector () {
	if (connector) {Destroy(connector);}
	var con : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/objConnector"));
	gameObject.transform.parent = con.transform;
	connected = true;
	connector = con;
	return con;
}

function CheckForMatch () {
	var piecesList = GameObject.FindGameObjectsWithTag("tagPiece");

	for (var item : GameObject in piecesList) {
		if (item.GetComponent(scrPiece).gridPos.x == gridPos.x+1 && item.GetComponent(scrPiece).gridPos.y == gridPos.y) {
			var distX : float = item.transform.position.x - transform.position.x - 1.6;
			var distY : float = item.transform.position.y - transform.position.y;
			Debug.Log(distX.ToString() + "   " + distY.ToString());
			if (distX > -0.2 && distX < 0.2 && distY > -0.2 && distY < 0.2) {
				transform.position.x = item.transform.position.x-1.6;
				transform.position.y = item.transform.position.y;
				if (connector) {
					if (item.GetComponent(scrPiece).connector) {
						
					}
				}
				else {
					
				}
				var con = item.GetComponent(scrPiece).CreateConnector();
				gameObject.transform.parent = con.transform;
				connected = true;
				connector = con;
			}
		}
	}
}

function ConnectToConnector (con : GameObject) {
	gameObject.transform.parent = con.transform;
	connected = true;
	connector = con;
}
*/










