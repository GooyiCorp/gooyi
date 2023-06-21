from rest_framework import status
from rest_framework.response import Response


def sendSuccess(message, data = None):
    res_data = {
        "success": True,
        "message": message
    }
    if data is not None: res_data["data"] = data
    return Response(data=res_data, status=status.HTTP_200_OK)

def sendError(error, data, code = None):
    res_data = {
        "success": False,
        "error": error,
        "data": data
    }
    if code is None: return Response(data=res_data)    
    if code == 400: return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
    if code == 403: return Response(data=res_data, status=status.HTTP_403_FORBIDDEN)
    if code == 404: return Response(data=res_data, status=status.HTTP_404_NOT_FOUND)
    
def sendInternalError():
    data = {
        "success": False,
        "message": "Internal Server Error"
    }
    return Response(data= data, status= status.HTTP_500_INTERNAL_SERVER_ERROR)