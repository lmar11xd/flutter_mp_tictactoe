class Player {
  final String nickname;
  final String socketID;
  final double points;
  final String playerType;

  Player({
    required this.nickname,
    required this.socketID,
    required this.points,
    required this.playerType,
  });

  Map<String, dynamic> toMap() {
    return {
      'nickname': nickname,
      'socketID': socketID,
      'points': points,
      'playerType': playerType,
    };
  }

  factory Player.fromMap(Map<String, dynamic> map) {
    return Player(
      nickname: map['nickname'] ?? '',
      socketID: map['socketID'] ?? '',
      points: map['points']?.toDouble() ?? 0.0,
      playerType: map['playerType'] ?? '',
    );
  }
}
