import 'package:flutter/material.dart';
import 'package:mp_tictactoe/responsive/responsive.dart';
import 'package:mp_tictactoe/widgets/custom_buttom.dart';

import 'create_room_screen.dart';
import 'join_room_screen.dart';

class MainMenuScreen extends StatelessWidget {
  static String routeName = '/main-menu';
  const MainMenuScreen({Key? key}) : super(key: key);

  void createRoom(BuildContext context) {
    Navigator.pushNamed(context, CreateRoomScreen.routeName);
  }

  void joinRoom(BuildContext context) {
    Navigator.pushNamed(context, JoinRoomScreen.routeName);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Responsive(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomButtom(onTap: () => createRoom(context), text: 'Create Room'),
            const SizedBox(height: 10),
            CustomButtom(onTap: () => joinRoom(context), text: 'Join Room'),
          ],
        ),
      ),
    );
  }
}
